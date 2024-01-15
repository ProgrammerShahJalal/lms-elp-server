import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  IExamQuestionMarkPayload,
  IExamResult,
  IExamResultFilters,
} from "./exam-result.interface";
import { ExamResult } from "./exam-result.model";
import { User } from "../user/user.model";
import { Exam } from "../exam/exam.model";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { examResultFilterableFields } from "./exam-result.constants";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";

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

  let result;
  payload.total_marks = exam.total_marks;
  payload.exam_type = exam.exam_type;
  if (exam.exam_type === "1") {
    // if written exam is submitted by student
    if (!payload.answer) {
      throw new ApiError(httpStatus.OK, "Please provide your answer link.");
    }
    result = await ExamResult.create(payload);
    return result;
  } else if (exam.exam_type === "0") {
    // if quiz exam is submitted by student
    result = await ExamResult.create(payload);
    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid exam type!");
  }
};

// create/give exam question mark
const giveQuestionMark = async (payload: IExamQuestionMarkPayload) => {
  const examResult = await ExamResult.findOne({
    user_id: payload.user_id,
    exam_id: payload.exam_id,
  });

  if (!examResult) {
    throw new ApiError(httpStatus.OK, "Invalid user id or exam id!");
  }

  let totalCorrectAnswer = 0;
  for (const mark of payload.marks) {
    totalCorrectAnswer += mark.mark_obtained;
  }
  const result = await ExamResult.updateOne(
    { _id: examResult._id },
    {
      $set: {
        question_mark: payload.marks,
        totalCorrectAnswer: totalCorrectAnswer,
        total_wrong_answer: examResult.total_marks - totalCorrectAnswer,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

// get all ExamResults
const getAllExamResults = async (
  filters: IExamResultFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IExamResult[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: examResultFilterableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ExamResult.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("course_id");
  const total = await ExamResult.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
  giveQuestionMark,
  getAllExamResults,
  getSingleExamResult,
  updateExamResult,
  deleteExamResult,
};
