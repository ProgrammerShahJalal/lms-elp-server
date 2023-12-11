import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Exam } from "../exam/exam.model";
import { IQuizQuestion } from "./quiz-question.interface";
import { QuizQuestion } from "./quiz-question.model";

// creating Quiz Question
const createQuizQuestion = async (
  payload: IQuizQuestion
): Promise<IQuizQuestion> => {
  // check if the provided exam_id have exam in the db or not
  const { exam_id } = payload;
  if (exam_id) {
    const exam = await Exam.findById(exam_id);
    if (!exam) {
      throw new ApiError(httpStatus.NOT_FOUND, "Exam not found!");
    }
  }
  const result = await QuizQuestion.create(payload);

  return result;
};

// get all Quiz Questions
const getAllQuizQuestions = async (): Promise<IQuizQuestion[]> => {
  const result = await QuizQuestion.find({});

  // if no Quiz Question found, throw error
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No quiz question found!");
  }

  return result;
};

// get single Quiz Question
const getSingleQuizQuestion = async (
  id: string
): Promise<IQuizQuestion | null> => {
  const result = await QuizQuestion.findById(id);

  // if QuizQuestion not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Quiz question not found!");
  }

  return result;
};

// update quiz Quiz Question
const updateQuizQuestion = async (
  id: string,
  payload: Partial<IQuizQuestion>
): Promise<IQuizQuestion | null> => {
  const result = await QuizQuestion.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Quiz question not found!"
    );
  }
  return result;
};

// delete quiz Quiz Question
const deleteQuizQuestion = async (id: string) => {
  const result = await QuizQuestion.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Quiz question not found!"
    );
  }
  return result;
};

export const QuizQuestionService = {
  createQuizQuestion,
  getAllQuizQuestions,
  getSingleQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
};
