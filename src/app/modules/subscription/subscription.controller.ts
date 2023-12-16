import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationFields } from "../../constants/pagination";
import pick from "../../../shared/pick";
import { SubscriptionService } from "./subscription.service";
import { subscriptionFilterableFields } from "./subscription.constants";

const createSubscription = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionService.createSubscription(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Subscription added successfully!",
    data: result,
  });
});

const getAllSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, subscriptionFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await SubscriptionService.getAllSubscriptions(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Subscriptions fetched successfully!",
    data: result,
  });
});

const getSingleSubscription = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SubscriptionService.getSingleSubscription(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Subscription fetched successfully!",
      data: result,
    });
  }
);

const updateSubscription = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await SubscriptionService.updateSubscription(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Subscription updated in successfully!",
    data: result,
  });
});
const deleteSubscription = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubscriptionService.deleteSubscription(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Subscription deleted in successfully!",
    data: result,
  });
});

export const SubscriptionController = {
  createSubscription,
  getAllSubscriptions,
  getSingleSubscription,
  updateSubscription,
  deleteSubscription,
};
