import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ShippingAddressService } from "./shipping-address.service";
import ApiError from "../../../errors/ApiError";

const createShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    const verifiedUser = req?.user;
    const payload = req.body;

    if (
      verifiedUser?.role !== "super_admin" &&
      verifiedUser?.role !== "admin" &&
      payload.user_id !== verifiedUser?.userId
    ) {
      throw new ApiError(httpStatus.OK, "Unauthorized! Login to your account.");
    }

    const result = await ShippingAddressService.createShippingAddress(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Shipping address added successfully!",
      data: result,
    });
  }
);

const getAllShippingAddresss = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ShippingAddressService.getAllShippingAddresss();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Shipping addresses fetched successfully!",
      data: result,
    });
  }
);

const getSingleShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user_id = req?.user?.userId;

    const result = await ShippingAddressService.getSingleShippingAddress(
      id,
      user_id
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Shipping address fetched successfully!",
      data: result,
    });
  }
);

const getMyShippingAddress = catchAsync(async (req: Request, res: Response) => {
  const user_id = req?.user?.userId;

  const result = await ShippingAddressService.getMyShippingAddress(user_id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Shipping address fetched successfully!",
    data: result,
  });
});

const updateShippingAddress = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifiedUser = req?.user;
    const payload = req.body;

    if (payload.user_id) {
      if (
        verifiedUser?.role !== "super_admin" &&
        verifiedUser?.role !== "admin" &&
        verifiedUser?.userId !== payload.user_id
      ) {
        throw new ApiError(
          httpStatus.OK,
          "Unauthorized! Login to your account."
        );
      }
    }

    const result = await ShippingAddressService.updateShippingAddress(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Shipping address updated in successfully!",
      data: result,
    });
  }
);
const deleteShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await ShippingAddressService.deleteShippingAddress(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Shipping address deleted in successfully!",
      data: result,
    });
  }
);

export const ShippingAddressController = {
  createShippingAddress,
  getAllShippingAddresss,
  getMyShippingAddress,
  getSingleShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
