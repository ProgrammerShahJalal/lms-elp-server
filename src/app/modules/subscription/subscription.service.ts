import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ISubscription, ISubscriptionFilters } from "./subscription.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { Course } from "../course/course.model";
import { Subscription } from "./subscription.model";
import { subscriptionFilterableFields } from "./subscription.constants";

// create Subscription
const createSubscription = async (
  payload: ISubscription
): Promise<ISubscription> => {
  // to check if the course is present of the provided course-id
  const { course_id } = payload;
  const course = await Course.findById(course_id);
  if (!course) {
    throw new ApiError(httpStatus.OK, "Course not found!");
  }

  const result = await Subscription.create(payload);
  return result;
};

// get all Subscriptions
const getAllSubscriptions = async (
  filters: ISubscriptionFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISubscription[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: subscriptionFilterableFields.map((field) => ({
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

  const result = await Subscription.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("course_id");
  const total = await Subscription.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get Subscription
const getSingleSubscription = async (
  id: string
): Promise<ISubscription | null> => {
  const result = await Subscription.findById(id).populate("course_id");

  // if the Subscription is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.OK, "Subscription not found!");
  }

  return result;
};

// update Subscription
const updateSubscription = async (
  id: string,
  payload: Partial<ISubscription>
): Promise<ISubscription | null> => {
  // updating Subscription
  const result = await Subscription.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  // if the Subscription you want to update was not present, i.e. not updated, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.OK,
      "Couldn't update. Subscription not found!"
    );
  }

  return result;
};

// delete user
const deleteSubscription = async (id: string) => {
  // find and delete Subscription in one operation
  const result = await Subscription.findOneAndDelete({ _id: id });

  // if the Subscription you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.OK,
      "Couldn't delete. Subscription not found!"
    );
  }

  return result;
};

export const SubscriptionService = {
  createSubscription,
  getAllSubscriptions,
  getSingleSubscription,
  updateSubscription,
  deleteSubscription,
};
