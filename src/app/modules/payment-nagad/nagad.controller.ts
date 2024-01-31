import { Request, Response } from "express";
import config from "../../../config";
import { NagadService } from "./nagad.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createPayment = async (req: Request, res: Response) => {
  const createPaymentConfig = req.body;
  const ipAddress = req.ip || req.socket.remoteAddress;
  createPaymentConfig.ip = ipAddress;
  const result = await NagadService.createPayment(createPaymentConfig);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Nagad payment successfull",
    data: result,
  });
};

export const NagadController = {
  createPayment,
};
