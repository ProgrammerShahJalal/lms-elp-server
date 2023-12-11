import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Exam } from "../exam/exam.model";
import { IUserExamQuestionMark } from "./user-exam-question-mark.interface";
import { UserExamQuestionMark } from "./user-exam-question-mark.model";
import { User } from "../user/user.model";
import { Question } from "../question/question.model";

// creating UserExamQuestionMark
const createUserExamQuestionMark = async (
  payload: IUserExamQuestionMark
): Promise<IUserExamQuestionMark> => {
  // check if the provided user_id have user in the db or not
  const { user_id, exam_id, question_id } = payload;
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // check if the provided exam_id have exam in the db or not
  const exam = await Exam.findById(exam_id);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam not found!");
  }

  // check if the provided question_id have question in the db or not
  const question = await Question.findById(question_id);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, "Question not found!");
  }

  const result = await UserExamQuestionMark.create(payload);

  return result;
};

// get all UserExamQuestionMarks
const getAllUserExamQuestionMarks = async (): Promise<
  IUserExamQuestionMark[]
> => {
  const result = await UserExamQuestionMark.find({});

  // if no UserExamQuestionMark found, throw error
  if (!result.length) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No user exam question mark found!"
    );
  }

  return result;
};

// get single quiz UserExamQuestionMark
const getSingleUserExamQuestionMark = async (
  id: string
): Promise<IUserExamQuestionMark | null> => {
  const result = await UserExamQuestionMark.findById(id);

  // if UserExamQuestionMark not found, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User exam question mark not found!"
    );
  }

  return result;
};

// update quiz UserExamQuestionMark
const updateUserExamQuestionMark = async (
  id: string,
  payload: Partial<IUserExamQuestionMark>
): Promise<IUserExamQuestionMark | null> => {
  const result = await UserExamQuestionMark.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. User exam question mark not found!"
    );
  }
  return result;
};

// delete quiz UserExamQuestionMark
const deleteUserExamQuestionMark = async (id: string) => {
  const result = await UserExamQuestionMark.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. User exam question mark not found!"
    );
  }
  return result;
};

export const UserExamQuestionMarkService = {
  createUserExamQuestionMark,
  getAllUserExamQuestionMarks,
  getSingleUserExamQuestionMark,
  updateUserExamQuestionMark,
  deleteUserExamQuestionMark,
};
