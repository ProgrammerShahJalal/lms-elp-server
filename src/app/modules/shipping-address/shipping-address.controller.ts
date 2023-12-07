import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ShippingAddressService } from "./shipping-address.service";

const createShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ShippingAddressService.createShippingAddress(req.body);

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
    const result = await ShippingAddressService.getSingleShippingAddress(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Shipping address fetched successfully!",
      data: result,
    });
  }
);

const updateShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await ShippingAddressService.updateShippingAddress(
      id,
      payload
    );

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
  getSingleShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
