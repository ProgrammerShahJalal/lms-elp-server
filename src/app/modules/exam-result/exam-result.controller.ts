import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ExamResultService } from "./exam-result.service";

const createExamResult = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamResultService.createExamResult(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam result added successfully!",
    data: result,
  });
});

const getAllExamResults = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamResultService.getAllExamResults();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Exam results fetched successfully!",
    data: result,
  });
});

const getExamResultOfAUser = async (req: Request, res: Response) => {
  const { exam_id, user_id } = req.params;
  const result = await ExamResultService.getAllExamResults();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam result of an exam of a user fetched successfully!",
    data: result,
  });
};

const getSingleExamResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamResultService.getSingleExamResult(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam result fetched successfully!",
    data: result,
  });
});

const updateExamResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ExamResultService.updateExamResult(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam result updated in successfully!",
    data: result,
  });
});
const deleteExamResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamResultService.deleteExamResult(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam result deleted in successfully!",
    data: result,
  });
});

export const ExamResultController = {
  createExamResult,
  getAllExamResults,
  getSingleExamResult,
  getExamResultOfAUser,
  updateExamResult,
  deleteExamResult,
};
