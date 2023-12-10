import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ExamSubmissionService } from "./exam-submission.service";

const createExamSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await ExamSubmissionService.createExamSubmission(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam submission done successfully!",
    data: result,
  });
});

const getAllExamSubmissions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ExamSubmissionService.getAllExamSubmissions();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All exam submissions fetched successfully!",
      data: result,
    });
  }
);

const getSingleExamSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ExamSubmissionService.getSingleExamSubmission(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Exam submission fetched successfully!",
      data: result,
    });
  }
);

const updateExamSubmission = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ExamSubmissionService.updateExamSubmission(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam submission updated in successfully!",
    data: result,
  });
});
const deleteExamSubmission = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamSubmissionService.deleteExamSubmission(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Exam submission deleted in successfully!",
    data: result,
  });
});

export const ExamSubmissionController = {
  createExamSubmission,
  getAllExamSubmissions,
  getSingleExamSubmission,
  updateExamSubmission,
  deleteExamSubmission,
};
