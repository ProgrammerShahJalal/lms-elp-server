import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Exam } from "../exam/exam.model";
import { IQuestion } from "./question.interface";
import { Question } from "./question.model";

// creating question
const createQuestion = async (payload: IQuestion): Promise<IQuestion> => {
  // check if the provided exam_id have exam in the db or not
  const { exam_id } = payload;
  if (exam_id) {
    const exam = await Exam.findById(exam_id);
    if (!exam) {
      throw new ApiError(httpStatus.NOT_FOUND, "Exam not found!");
    }

    // if adding this question to the exam exceeds the total_marks limit for the exam
    const { total_marks } = exam;
    const questions = await Question.find({
      exam_id,
    });
    const totalMarkQuestionAdded = questions.reduce(
      (sum, question) => sum + (question.mark || 0),
      0
    );
    if (totalMarkQuestionAdded + payload.mark > total_marks) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Adding this question exceeds ${total_marks} marks for this exam.`
      );
    }
  }
  const result = await Question.create(payload);

  return result;
};

// get all questions
const getAllQuestions = async (): Promise<IQuestion[]> => {
  const result = await Question.find({});

  // if no question found, throw error
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No question found!");
  }

  return result;
};

// get single quiz question
const getSingleQuestion = async (id: string): Promise<IQuestion | null> => {
  const result = await Question.findById(id);

  // if question not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Question not found!");
  }

  return result;
};

// update quiz question
const updateQuestion = async (
  id: string,
  payload: Partial<IQuestion>
): Promise<IQuestion | null> => {
  const result = await Question.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Question not found!"
    );
  }
  return result;
};

// delete quiz question
const deleteQuestion = async (id: string) => {
  const result = await Question.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Question not found!"
    );
  }
  return result;
};

export const QuestionService = {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
