import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { QuizQuestionService } from "./quiz-question.service";

const createQuizQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await QuizQuestionService.createQuizQuestion(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quiz question added successfully!",
    data: result,
  });
});

const getAllQuizQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await QuizQuestionService.getAllQuizQuestions();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All quiz questions fetched successfully!",
    data: result,
  });
});

const getSingleQuizQuestion = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await QuizQuestionService.getSingleQuizQuestion(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Quiz question fetched successfully!",
      data: result,
    });
  }
);

const updateQuizQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await QuizQuestionService.updateQuizQuestion(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quiz question updated in successfully!",
    data: result,
  });
});
const deleteQuizQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await QuizQuestionService.deleteQuizQuestion(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quiz question deleted in successfully!",
    data: result,
  });
});

export const QuizQuestionController = {
  createQuizQuestion,
  getAllQuizQuestions,
  getSingleQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
};
