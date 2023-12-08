import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ExamService } from "./exam.service";

const createExam = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamService.createExam(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam added successfully!",
    data: result,
  });
});

const getAllExams = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamService.getAllExams();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Exams fetched successfully!",
    data: result,
  });
});

const getSingleExam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamService.getSingleExam(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam fetched successfully!",
    data: result,
  });
});

const updateExam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ExamService.updateExam(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam updated in successfully!",
    data: result,
  });
});
const deleteExam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamService.deleteExam(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam deleted in successfully!",
    data: result,
  });
});

export const ExamController = {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
  deleteExam,
};
