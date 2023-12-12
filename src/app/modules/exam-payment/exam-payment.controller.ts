import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ExamPaymentService } from "./exam-payment.service";

const createExamPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamPaymentService.createExamPayment(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam payment added successfully!",
    data: result,
  });
});

const getAllExamPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamPaymentService.getAllExamPayments();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All exam payments fetched successfully!",
    data: result,
  });
});

const getSingleExamPayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamPaymentService.getSingleExamPayment(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam payment fetched successfully!",
    data: result,
  });
});

const updateExamPayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ExamPaymentService.updateExamPayment(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam payment updated in successfully!",
    data: result,
  });
});
const deleteExamPayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamPaymentService.deleteExamPayment(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam payment deleted in successfully!",
    data: result,
  });
});

export const ExamPaymentController = {
  createExamPayment,
  getAllExamPayments,
  getSingleExamPayment,
  updateExamPayment,
  deleteExamPayment,
};
