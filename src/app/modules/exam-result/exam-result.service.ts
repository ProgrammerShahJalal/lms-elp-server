import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IExamResult } from "./exam-result.interface";
import { ExamResult } from "./exam-result.model";
import { User } from "../user/user.model";
import { Exam } from "../exam/exam.model";

// create ExamResult
const createExamResult = async (payload: IExamResult): Promise<IExamResult> => {
  // if the provided user_id have the user or not in db
  const { user_id, exam_id } = payload;
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // if the provided user_id have the user or not in db
  const exam = await Exam.findById(exam_id);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam not found!");
  }

  const result = await ExamResult.create(payload);

  return result;
};

// get all ExamResults
const getAllExamResults = async (): Promise<IExamResult[]> => {
  const result = await ExamResult.find({});
  return result;
};

const getExamResultOfAUser = async (user_id: string, exam_id: string) => {
  const result = await ExamResult.findOne({
    user_id,
    exam_id,
  });
  return result;
};

// get single ExamResult
const getSingleExamResult = async (id: string): Promise<IExamResult | null> => {
  const result = await ExamResult.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam result not found!");
  }

  return result;
};

// update ExamResult
const updateExamResult = async (
  id: string,
  payload: Partial<IExamResult>
): Promise<IExamResult | null> => {
  const result = await ExamResult.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete ExamResult
const deleteExamResult = async (id: string) => {
  const result = await ExamResult.findByIdAndDelete(id);
  return result;
};

export const ExamResultService = {
  createExamResult,
  getAllExamResults,
  getSingleExamResult,
  getExamResultOfAUser,
  updateExamResult,
  deleteExamResult,
};
