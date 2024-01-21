import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICourse, ICourseFilters } from "./course.interface";
import { Course } from "./course.model";
import { SubCategory } from "../sub-category/sub-category.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { courseSearchableFields } from "./course.constants";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";
import { ISubscriptionHistory } from "../subscription-history/subscription-history.interface";
import { User } from "../user/user.model";
import { Subscription } from "../subscription/subscription.model";
import { Payment } from "../payment/payment.model";
import { SubscriptionHistory } from "../subscription-history/subscription-history.model";
import { Types } from "mongoose";
import { ISubscription } from "../subscription/subscription.interface";

// create Course
const createCourse = async (req: Request): Promise<ICourse> => {
  // to check if the sub-category is present of the provided sub-category-id
  const { sub_category_id } = req.body;
  const subCategory = await SubCategory.findById(sub_category_id).populate(
    "category_id"
  );
  if (!subCategory) {
    throw new ApiError(httpStatus.OK, "Sub category not found!");
  }
  // @ts-ignore
  req.body.category_id = subCategory.category_id._id.toString();

  if (req.file) {
    const file = req.file as IUploadFile;

    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.banner = uploadedImage.secure_url;
    }
  }

  const result = (await Course.create(req.body)).populate({
    path: "sub_category_id",
    select: "title _id",
    populate: {
      path: "category_id",
      select: "title _id",
    },
  });
  return result;
};

// buy a course
const BuyACourse = async (
  payload: ISubscriptionHistory
): Promise<ISubscriptionHistory> => {
  // to check if the course is present of the provided course-id
  const { user_id, subscription_id, trx_id } = payload;

  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.OK, "User not found!");
  }
  const subscription = await Subscription.findById(subscription_id).populate(
    "course_id"
  );
  if (!subscription) {
    throw new ApiError(httpStatus.OK, "Subscription not found!");
  }

  const validPayment = await Payment.findOne({ trxID: trx_id });
  if (!validPayment) {
    throw new ApiError(httpStatus.OK, "Invalid transaction id!");
  }

  if (Number(subscription?.cost) !== Number(validPayment?.amount)) {
    throw new ApiError(httpStatus.OK, "Invalid payment amount!");
  }

  // check if your subscription day left
  const today: number = new Date().getTime();
  const alreadyHaveSubscription: ISubscriptionHistory[] | null =
    await SubscriptionHistory.find({
      user_id,
      course_id: subscription?.course_id?.id,
      expire_date: { $gt: today },
    });
  if (alreadyHaveSubscription?.length) {
    // Calculate the number of days left for the subscription
    const daysLeft = Math.ceil(
      (alreadyHaveSubscription[0].expire_date.getTime() - today) /
        (1000 * 60 * 60 * 24)
    );
    throw new ApiError(
      httpStatus.OK,
      `You have an active subscription. It will expire in ${daysLeft} days.`
    );
  }

  payload.course_id = subscription.course_id;
  payload.amount = subscription.cost;
  let expire_date = new Date();
  expire_date.setMonth(
    expire_date.getMonth() + subscription.subscription_duration_in_months
  );
  payload.expire_date = expire_date;
  payload.is_active = payload?.is_active || true;

  const result = await SubscriptionHistory.create(payload);
  return result;
};

// get total price/cost of a sub category
const GetTotalCostsOfSubCategory = async (payload: {
  sub_category_id: string;
}) => {
  const { sub_category_id } = payload;

  const sub_category = await SubCategory.findById(sub_category_id);
  if (!sub_category) {
    throw new ApiError(httpStatus.OK, "Sub category not found!");
  }

  const result = await Course.aggregate([
    {
      $match: {
        sub_category_id: new Types.ObjectId(sub_category_id),
      },
    },
    {
      $lookup: {
        from: "subscriptions", // name of the Subscription collection in MongoDB
        localField: "_id",
        foreignField: "course_id",
        as: "subscription",
      },
    },
    {
      $unwind: "$subscription",
    },
    {
      $project: {
        "subscription.subscription_duration_in_months": 1,
        "subscription.cost": 1,
      },
    },
    {
      $group: {
        _id: "$subscription.subscription_duration_in_months",
        total_cost: { $sum: "$subscription.cost" },
      },
    },
    {
      $project: {
        subscription_duration_in_months: "$_id",
        total_cost: 1,
        _id: 0,
      },
    },
  ]);

  return result;
};

const BuyAllCoursesOfASubCategory = async (payload: {
  user_id: string;
  sub_category_id: string;
  subscription_duration_in_months: string;
  trx_id: string;
}) => {
  const { user_id, sub_category_id, subscription_duration_in_months, trx_id } =
    payload;

  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.OK, "User not found!");
  }

  const sub_category = await SubCategory.findById(sub_category_id);
  if (!sub_category) {
    throw new ApiError(httpStatus.OK, "Sub category not found!");
  }

  const costFromDB = (
    await GetTotalCostsOfSubCategory({ sub_category_id })
  ).find(
    (price) =>
      price.subscription_duration_in_months === subscription_duration_in_months
  ).total_cost;

  // checking validity of transaction id
  const validPayment = await Payment.findOne({ trxID: trx_id });
  if (!validPayment) {
    throw new ApiError(httpStatus.OK, "Invalid transaction id!");
  }
  // if the amount of payment needed is paid
  // if (costFromDB !== validPayment?.amount) {
  //   throw new ApiError(
  //     httpStatus.OK,
  //     `Invalid payment amount! You had to pay ${costFromDB} taka!`
  //   );
  // }

  // using aggregation pipeline, merge subscriptions and course and group
  const courseSubscriptions = await Course.aggregate([
    {
      $match: {
        sub_category_id: new Types.ObjectId(sub_category_id),
      },
    },
    {
      $lookup: {
        from: "subscriptions", // name of the Subscription collection in MongoDB
        localField: "_id",
        foreignField: "course_id",
        as: "subscription",
      },
    },
    {
      $unwind: "$subscription",
    },
    {
      $match: {
        "subscription.subscription_duration_in_months":
          subscription_duration_in_months,
      },
    },
    {
      $group: {
        _id: "$subscription.subscription_duration_in_months",
        subscriptions: { $push: "$subscription" },
        total_cost: { $sum: "$subscription.cost" },
      },
    },
  ]);

  if (courseSubscriptions.length < 1) {
    throw new ApiError(
      httpStatus.OK,
      "No course subscription found for your desired sub category"
    );
  }

  // mapping subscriptions and creating subscriptions histories
  const subscriptionPromises =
    courseSubscriptions.length &&
    courseSubscriptions[0].subscriptions.map(
      async (subscription: ISubscription) => {
        let subscriptionHistoryPayload: Partial<ISubscriptionHistory> = {
          course_id: subscription?.course_id,
          amount: subscription?.cost,
        };
        let expire_date = new Date();
        expire_date.setMonth(
          expire_date.getMonth() + subscription.subscription_duration_in_months
        );
        subscriptionHistoryPayload.expire_date = expire_date;
        subscriptionHistoryPayload.is_active =
          subscriptionHistoryPayload?.is_active || true;
        // check if your subscription day left
        const today: number = new Date().getTime();
        const alreadyHaveSubscription: ISubscriptionHistory[] | null =
          await SubscriptionHistory.find({
            user_id,
            course_id: subscription?.course_id,
            expire_date: { $gt: today },
          });
        if (alreadyHaveSubscription?.length) {
          // Calculate the number of days left for the subscription
          const daysLeft = Math.ceil(
            (alreadyHaveSubscription[0].expire_date.getTime() - today) /
              (1000 * 60 * 60 * 24)
          );
          throw new ApiError(
            httpStatus.OK,
            `You have an active subscription. It will expire in ${daysLeft} days.`
          );
        }
      }
    );

  // if (courseSubscriptions[0].total_cost > Number(validPayment?.amount)) {
  //   throw new ApiError(
  //     httpStatus.OK,
  //     `Invalid amount payed. You must pay ${courseSubscriptions[0].total_cost} taka.`
  //   );
  // }

  // const result = await Course.aggregate([
  //   {
  //     $match: {
  //       sub_category_id: new Types.ObjectId(sub_category_id),
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "subscriptions", // name of the Subscription collection in MongoDB
  //       localField: "_id",
  //       foreignField: "course_id",
  //       as: "subscription",
  //     },
  //   },
  //   {
  //     $unwind: "$subscription",
  //   },
  //   {
  //     $project: {
  //       "subscription.subscription_duration_in_months": 1,
  //       "subscription.cost": 1,
  //     },
  //   },
  //   {
  //     $match: {
  //       "subscription.subscription_duration_in_months":
  //         subscription_duration_in_months,
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$subscription.subscription_duration_in_months",
  //       total_cost: { $sum: "$subscription.cost" },
  //     },
  //   },
  // ]);

  return courseSubscriptions;
};

// get all courses
const getAllCourses = async (
  filters: ICourseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICourse[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: courseSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  let result = await Course.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "sub_category_id",
      select: "title _id",
      populate: {
        path: "category_id",
        select: "title _id",
      },
    })
    .select("-createdAt -updatedAt -__v -study_materials");
  const total = await Course.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAllRoutines = async () => {
  const result = await Course.find({})
    .populate({
      path: "sub_category_id",
      select: "title",
      populate: {
        path: "category_id",
        select: "title",
      },
    })
    .select("routine");
  return result;
};

// get Course
const getSingleCourse = async (id: string): Promise<ICourse | null> => {
  const result = await Course.findById(id)
    .populate({
      path: "sub_category_id",
      select: "title _id",
      populate: {
        path: "category_id",
        select: "title _id",
      },
    })
    .select("-createdAt -updatedAt -__v");
  // if the Course is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.OK, "Course not found!");
  }

  return result;
};

// update Course
const updateCourse = async (req: Request): Promise<ICourse | null> => {
  // find course of given id
  const course = await Course.findById(req.params.id);
  if (!course) {
    throw new ApiError(httpStatus.OK, "Course not found!");
  }

  // if image is given, upload new, and delete old one
  if (req.file) {
    const file = req.file as IUploadFile;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.banner = uploadedImage.secure_url;
    }
    if (course.banner) {
      // delete that course banner image from cloudinary
      FileUploadHelper.deleteFromCloudinary(course?.banner as string);
    }
  }

  // updating course
  const result = await Course.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );

  return result;
};

// delete course
const deleteCourse = async (id: string) => {
  const course = await Course.findById(id);

  if (!course) {
    throw new ApiError(httpStatus.OK, "Course not found!");
  } else {
    if (course.banner) {
      // delete that course banner from cloudinary
      FileUploadHelper.deleteFromCloudinary(course?.banner as string);
    }
  }

  // find and delete course in one operation
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseService = {
  createCourse,
  BuyACourse,
  BuyAllCoursesOfASubCategory,
  getAllCourses,
  GetTotalCostsOfSubCategory,
  getAllRoutines,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
