import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Course } from "../course/course.model";
import { IExam, IExamFilters } from "./exam.interface";
import { Exam } from "./exam.model";
import { IQuestion } from "../question/question.interface";
import { IQuizQuestion } from "../quiz-question/quiz-question.interface";
import { Question } from "../question/question.model";
import { QuizQuestion } from "../quiz-question/quiz-question.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { examSearchableFields } from "./exam.constants";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { SortOrder } from "mongoose";

// create exam
const createExam = async (payload: IExam): Promise<IExam> => {
  // if the provided course_id have the course or not in db
  const { course_id } = payload;
  if (course_id) {
    const course = await Course.findById(course_id);
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
    }
  }

  const result = await Exam.create(payload);

  return result;
};

// get all exams
const getAllExams = async (
  filters: IExamFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IExam[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: examSearchableFields.map((field) => ({
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

  const result = await Exam.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("course_id");
  const total = await Exam.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get questions of an exam
const getQuestionsOfAnExam = async (
  exam_id: string
): Promise<IQuestion[] | IQuizQuestion[]> => {
  let result;

  result = await Question.find({ exam_id });

  if (!result.length) {
    result = await QuizQuestion.find({ exam_id });
  }

  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No question found for this exam");
  }

  return result;
};

// get single exam
const getSingleExam = async (id: string): Promise<IExam | null> => {
  const result = await Exam.findById(id).populate("course_id");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam not found!");
  }

  return result;
};

// update exam
const updateExam = async (
  id: string,
  payload: Partial<IExam>
): Promise<IExam | null> => {
  const result = await Exam.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete exam
const deleteExam = async (id: string) => {
  const result = await Exam.findByIdAndDelete(id);
  return result;
};

export const ExamService = {
  createExam,
  getAllExams,
  getQuestionsOfAnExam,
  getSingleExam,
  updateExam,
  deleteExam,
};
