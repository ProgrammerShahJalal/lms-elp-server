import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Course } from "../course/course.model";
import { User } from "../user/user.model";
import { Exam } from "../exam/exam.model";
import { IQuizSubmission } from "./quiz-submission.interface";
import { Question } from "../question/question.model";
import { QuizSubmission } from "./quiz-submission.model";

// create Quiz Submission
const createQuizSubmission = async (
  payload: IQuizSubmission
): Promise<IQuizSubmission> => {
  // if the provided user_id have the user or not in db
  const { user_id, exam_id, quiz_question_id } = payload;
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // if the provided exam_id have the exam or not in db
  const exam = await Exam.findById(exam_id);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam not found!");
  }

  // if the provided quiz_question_id have the quiz question or not in db
  const quiz_question = await Question.findById(quiz_question_id);
  if (!quiz_question) {
    throw new ApiError(httpStatus.NOT_FOUND, "Quiz question not found!");
  }

  const result = await QuizSubmission.create(payload);

  return result;
};

// get all Quiz Submission
const getAllQuizSubmissions = async (): Promise<IQuizSubmission[]> => {
  const result = await QuizSubmission.find({});

  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No quiz submission found!");
  }
  return result;
};

// get single Quiz Submission
const getSingleQuizSubmission = async (
  id: string
): Promise<IQuizSubmission | null> => {
  const result = await QuizSubmission.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Quiz submission not found!");
  }

  return result;
};

// update Quiz Submission
const updateQuizSubmission = async (
  id: string,
  payload: Partial<IQuizSubmission>
): Promise<IQuizSubmission | null> => {
  const result = await QuizSubmission.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Quiz submission was not found!"
    );
  }

  return result;
};

// delete Quiz Submission
const deleteQuizSubmission = async (id: string) => {
  const result = await QuizSubmission.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Quiz submission wasn't found!"
    );
  }
  return result;
};

export const QuizSubmissionService = {
  createQuizSubmission,
  getAllQuizSubmissions,
  getSingleQuizSubmission,
  updateQuizSubmission,
  deleteQuizSubmission,
};
