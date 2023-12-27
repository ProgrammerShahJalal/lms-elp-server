import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { SubCategory } from "../sub-category/sub-category.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { Course } from "../course/course.model";
import { SubscriptionHistory } from "./subscription-history.model";
import { User } from "../user/user.model";
import { Subscription } from "../subscription/subscription.model";
import {
  ISubscriptionHistory,
  ISubscriptionHistoryFilters,
} from "./subscription-history.interface";

// create SubscriptionHistory
const createSubscriptionHistory = async (
  payload: ISubscriptionHistory
): Promise<ISubscriptionHistory> => {
  // to check if the course is present of the provided course-id
  const { user_id, course_id, subscription_id } = payload;
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  const course = await Course.findById(course_id);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  }
  const subscription = await Subscription.findById(subscription_id);
  if (!subscription) {
    throw new ApiError(httpStatus.NOT_FOUND, "Subscription not found!");
  }

  payload.amount = subscription.cost;
  const expire_date = new Date();
  expire_date.setMonth(
    expire_date.getMonth() + subscription.subcription_duration_in_months
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
    .limit(limit);
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
  getSingleSubscriptionHistory,
  updateSubscriptionHistory,
  deleteSubscriptionHistory,
};
