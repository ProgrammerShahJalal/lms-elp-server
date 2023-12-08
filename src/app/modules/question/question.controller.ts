import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { QuestionService } from "./question.service";

const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionService.createQuestion(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Question added successfully!",
    data: result,
  });
});

const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionService.getAllQuestions();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All questions fetched successfully!",
    data: result,
  });
});

const getSingleQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await QuestionService.getSingleQuestion(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Question fetched successfully!",
    data: result,
  });
});

const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await QuestionService.updateQuestion(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Question updated in successfully!",
    data: result,
  });
});
const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await QuestionService.deleteQuestion(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Question deleted in successfully!",
    data: result,
  });
});

export const QuestionController = {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
