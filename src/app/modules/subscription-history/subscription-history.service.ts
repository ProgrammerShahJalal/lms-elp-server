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
import { Payment } from "../payment/payment.model";
import axios from "axios";
import config from "../../../config";

// create Subscription history
const createSubscriptionHistory = async (
  payload: ISubscriptionHistory
): Promise<ISubscriptionHistory> => {
  // to check if the course is present of the provided course-id
  const { user_id, subscription_id, trx_id, payment_ref_id } = payload;

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

  let validPayment;
  if (trx_id) {
    validPayment = await Payment.findOne({ trxID: trx_id });
    if (!validPayment) {
      throw new ApiError(httpStatus.OK, "Invalid transaction id!");
    }
  } else if (payment_ref_id) {
    const { data: payment } = await axios.get(
      `${config.this_site_url}/api/v1/nagad/payment/verify/${payment_ref_id}`
    );
    await Payment.create({
      payment_ref_id,
      amount: payment?.data?.amount,
      customerMsisdn: payment?.data?.clientMobileNo,
    });
    validPayment = payment?.data;
  } else {
    throw new ApiError(
      httpStatus.OK,
      "Transaction id or Payment ref id must be given!"
    );
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
  // finding the subscription that has most number of days
  const latestSubscription = alreadyHaveSubscription?.sort(
    (a: ISubscriptionHistory, b: ISubscriptionHistory) =>
      b.expire_date.getTime() - a.expire_date.getTime()
  )?.[0];

  let expire_date = new Date();
  expire_date.setMonth(
    expire_date.getMonth() + subscription.subscription_duration_in_months
  );
  if (alreadyHaveSubscription?.length) {
    // Calculate the number of days left for the subscription
    const daysLeft = Math.ceil(
      (latestSubscription.expire_date.getTime() - today) / (1000 * 60 * 60 * 24)
    );
    expire_date.setDate(expire_date.getDate() + daysLeft);
  }

  // setting payload for creating subscription history
  payload.course_id = subscription.course_id;
  payload.amount = subscription.cost;
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
    throw new ApiError(httpStatus.OK, "Subscription history not found!");
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
      httpStatus.OK,
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
      httpStatus.OK,
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
