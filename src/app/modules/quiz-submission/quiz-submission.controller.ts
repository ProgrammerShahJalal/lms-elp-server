import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { QuizSubmissionService } from "./quiz-submission.service";

const createQuizSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await QuizSubmissionService.createQuizSubmission(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quiz submission done successfully!",
    data: result,
  });
});

const getAllQuizSubmissions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await QuizSubmissionService.getAllQuizSubmissions();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All quiz submissions fetched successfully!",
      data: result,
    });
  }
);

const getSingleQuizSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await QuizSubmissionService.getSingleQuizSubmission(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Quiz submission fetched successfully!",
      data: result,
    });
  }
);

const updateQuizSubmission = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await QuizSubmissionService.updateQuizSubmission(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quiz submission updated in successfully!",
    data: result,
  });
});
const deleteQuizSubmission = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await QuizSubmissionService.deleteQuizSubmission(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quiz submission deleted in successfully!",
    data: result,
  });
});

export const QuizSubmissionController = {
  createQuizSubmission,
  getAllQuizSubmissions,
  getSingleQuizSubmission,
  updateQuizSubmission,
  deleteQuizSubmission,
};
