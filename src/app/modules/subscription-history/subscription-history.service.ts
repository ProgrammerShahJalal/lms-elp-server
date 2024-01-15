import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { SubscriptionHistory } from "./subscription-history.model";
import { User } from "../user/user.model";
import { Subscription } from "../subscription/subscription.model";
import {
  ISubscriptionHistory,
  ISubscriptionHistoryFilters,
} from "./subscription-history.interface";

// create Subscription history
const createSubscriptionHistory = async (
  payload: ISubscriptionHistory
): Promise<ISubscriptionHistory> => {
  // to check if the course is present of the provided course-id
  const { user_id, subscription_id } = payload;

  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  const subscription = await Subscription.findById(subscription_id).populate(
    "course_id"
  );
  if (!subscription) {
    throw new ApiError(httpStatus.NOT_FOUND, "Subscription not found!");
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

// get all SubscriptionHistorys
const getAllSubscriptionHistorys = async (
  filters: ISubscriptionHistoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISubscriptionHistory[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

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

  const result = await SubscriptionHistory.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "course_id",
      populate: {
        path: "sub_category_id",
        populate: {
          path: "category_id",
        },
      },
    })
    .populate("subscription_id");
  const total = await SubscriptionHistory.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get my subscription-histories
const getMySubscriptionHistories = async (user_id: string) => {
  const result = await SubscriptionHistory.find({ user_id }).populate({
    path: "course_id",
    populate: {
      path: "sub_category_id",
      populate: {
        path: "category_id",
      },
    },
  });

  if (!result.length) {
    throw new ApiError(httpStatus.OK, "No subscription found!");
  }
  return result;
};

// get SubscriptionHistory
const getSingleSubscriptionHistory = async (
  id: string
): Promise<ISubscriptionHistory | null> => {
  const result = await SubscriptionHistory.findById(id).populate(
    "user_id course_id subscription_id"
  );

  // if the SubscriptionHistory is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Subscription history not found!");
  }

  return result;
};

// update SubscriptionHistory
const updateSubscriptionHistory = async (
  id: string,
  payload: Partial<ISubscriptionHistory>
): Promise<ISubscriptionHistory | null> => {
  // updating SubscriptionHistory
  const result = await SubscriptionHistory.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );

  // if the SubscriptionHistory you want to update was not present, i.e. not updated, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Subscription history not found!"
    );
  }

  return result;
};

// delete user
const deleteSubscriptionHistory = async (id: string) => {
  // find and delete SubscriptionHistory in one operation
  const result = await SubscriptionHistory.findOneAndDelete({ _id: id });

  // if the SubscriptionHistory you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Subscription history not found!"
    );
  }

  return result;
};

export const SubscriptionHistoryService = {
  createSubscriptionHistory,
  getAllSubscriptionHistorys,
  getMySubscriptionHistories,
  getSingleSubscriptionHistory,
  updateSubscriptionHistory,
  deleteSubscriptionHistory,
};
