import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { QuestionService } from "./question.service";
import { questionFilterableFields } from "./question.constants";
import { paginationFields } from "../../constants/pagination";
import pick from "../../../shared/pick";
import { ExamPayment } from "../exam-payment/exam-payment.model";
import ApiError from "../../../errors/ApiError";
import { Exam } from "../exam/exam.model";

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
  const filters = pick(req.query, questionFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await QuestionService.getAllQuestions(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All questions fetched successfully!",
    data: result,
  });
});

const getQuestionsOfAnExam = catchAsync(async (req: Request, res: Response) => {
  const { exam_id } = req.params;

  const exam = await Exam.findById(exam_id);
  if (!exam) {
    throw new ApiError(httpStatus.OK, "Exam not found!");
  }

  const examPayment = await ExamPayment.findOne({
    exam_id: exam_id,
    user_id: req.user?.userId,
  });

  // if there is exam fee and you haven't paid, throw error
  if (exam.fee && !examPayment) {
    throw new ApiError(httpStatus.OK, "You have to pay first for the exam!");
  }

  const result = await QuestionService.getQuestionsOfAnExam(exam_id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Questions fetched successfully!",
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
  getQuestionsOfAnExam,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
