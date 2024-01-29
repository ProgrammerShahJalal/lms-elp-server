import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationFields } from "../../constants/pagination";
import pick from "../../../shared/pick";
import { OrderStatusService } from "./order-status.service";
import { orderStatusFilterableFields } from "./order-status.constants";
const createOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderStatusService.createOrderStatus(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order status added successfully!",
    data: result,
  });
});

const getAllOrderStatuss = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderStatusFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await OrderStatusService.getAllOrderStatuss(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All order status fetched successfully!",
    data: result,
  });
});

const getSingleOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderStatusService.getSingleOrderStatus(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order status fetched successfully!",
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await OrderStatusService.updateOrderStatus(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order status updated in successfully!",
    data: result,
  });
});

const deleteOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderStatusService.deleteOrderStatus(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order status deleted in successfully!",
    data: result,
  });
});

export const OrderStatusController = {
  createOrderStatus,
  getAllOrderStatuss,
  getSingleOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
};
