import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { NagadService } from "./nagad.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createPayment = async (req: Request, res: Response) => {
  const createPaymentConfig = req.body;
  const ipAddress = req.ip || req.socket.remoteAddress;

  createPaymentConfig.ip = ipAddress;
  createPaymentConfig.orderId = "Inv" + uuidv4().substring(0, 6);
  createPaymentConfig.clientType = "PC_WEB";

  const result = await NagadService.createPayment(createPaymentConfig);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Nagad payment successfull",
    data: result,
  });
};

const verifyPayment = async (req: Request, res: Response) => {
  const payload = req.body;

  // fetching and setting client ip address
  const ipAddress = req.ip || req.socket.remoteAddress;
  payload.ip = ipAddress;

  // getting paymentRefId from params and setting to payload
  const { paymentRefId } = req.params;
  payload.paymentRefId = paymentRefId;

  payload.clientType = "PC_WEB";

  const result = await NagadService.verifyPayment(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Nagad payment data fetched successfull",
    data: result,
  });
};

export const NagadController = {
  createPayment,
  verifyPayment,
};
