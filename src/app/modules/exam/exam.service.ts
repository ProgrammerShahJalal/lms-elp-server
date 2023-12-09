import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Course } from "../course/course.model";
import { IExam } from "./exam.interface";
import { Exam } from "./exam.model";

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
const getAllExams = async (): Promise<IExam[]> => {
  const result = await Exam.find({});
  return result;
};

// get single exam
const getSingleExam = async (id: string): Promise<IExam | null> => {
  const result = await Exam.findById(id);

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
  getSingleExam,
  updateExam,
  deleteExam,
};
