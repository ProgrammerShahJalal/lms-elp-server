import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationFields } from "../../constants/pagination";
import pick from "../../../shared/pick";
import { SubscriptionHistoryService } from "./subscription-history.service";
import { subscriptionHistoryFilterableFields } from "./subscription-history.constants";

const createSubscriptionHistory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubscriptionHistoryService.createSubscriptionHistory(
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Subscription history added successfully!",
      data: result,
    });
  }
);

const getAllSubscriptionHistorys = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, subscriptionHistoryFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await SubscriptionHistoryService.getAllSubscriptionHistorys(
      filters,
      paginationOptions
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All subscription historys fetched successfully!",
      data: result,
    });
  }
);

const getMySubscriptionHistories = catchAsync(
  async (req: Request, res: Response) => {
    const user_id = req.user?.userId;
    const result = await SubscriptionHistoryService.getMySubscriptionHistories(
      user_id
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Subscription histories fetched successfully!",
      data: result,
    });
  }
);

const getSingleSubscriptionHistory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SubscriptionHistoryService.getSingleSubscriptionHistory(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Subscription history fetched successfully!",
      data: result,
    });
  }
);

const updateSubscriptionHistory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await SubscriptionHistoryService.updateSubscriptionHistory(
      id,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Subscription history updated in successfully!",
      data: result,
    });
  }
);
const deleteSubscriptionHistory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SubscriptionHistoryService.deleteSubscriptionHistory(
      id
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Subscription history deleted in successfully!",
      data: result,
    });
  }
);

export const SubscriptionHistoryController = {
  createSubscriptionHistory,
  getAllSubscriptionHistorys,
  getMySubscriptionHistories,
  getSingleSubscriptionHistory,
  updateSubscriptionHistory,
  deleteSubscriptionHistory,
};
