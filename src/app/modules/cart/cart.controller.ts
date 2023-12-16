import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../constants/pagination";
import { CartService } from "./cart.service";
import { cartFilterableFields } from "./cart.constants";

const createCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.createCart(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart added successfully!",
    data: result,
  });
});

const getAllCarts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cartFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CartService.getAllCarts(filters, paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Carts fetched successfully!",
    data: result,
  });
});

const getSingleCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CartService.getSingleCart(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart fetched successfully!",
    data: result,
  });
});

const updateCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CartService.updateCart(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart updated in successfully!",
    data: result,
  });
});
const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CartService.deleteCart(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart deleted in successfully!",
    data: result,
  });
});

export const CartController = {
  createCart,
  getAllCarts,
  getSingleCart,
  updateCart,
  deleteCart,
};
