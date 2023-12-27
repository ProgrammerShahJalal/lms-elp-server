import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationFields } from "../../constants/pagination";
import pick from "../../../shared/pick";
import { OrderService } from "./order.service";
import { orderFilterableFields } from "./order.constants";
import ApiError from "../../../errors/ApiError";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user_id = req.user?.userId;

  const result = await OrderService.createOrder(user_id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order added successfully!",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await OrderService.getAllOrders(filters, paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Orders fetched successfully!",
    data: result,
  });
});

const getOrdersOfAnUser = catchAsync(async (req: Request, res: Response) => {
  const { user_id } = req.params;

  const result = await OrderService.getOrdersOfAnUser(user_id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully!",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OrderService.getSingleOrder(id);

  // throw error if not admin/super_admin/user_id match
  if (
    req.user?.role === "admin" &&
    req.user?.role === "super_admin" &&
    req.user?.userId === result?.user_id?._id?.toString()
  ) {
    throw new ApiError(httpStatus.OK, "Unauthorized!");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order fetched successfully!",
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await OrderService.updateOrder(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order updated in successfully!",
    data: result,
  });
});
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrder(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order deleted in successfully!",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrdersOfAnUser,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
