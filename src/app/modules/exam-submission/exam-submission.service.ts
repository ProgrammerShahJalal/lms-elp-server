import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Course } from "../course/course.model";
import { IExamSubmission } from "./exam-submission.interface";
import { User } from "../user/user.model";
import { Exam } from "../exam/exam.model";
import { ExamSubmission } from "./exam-submission.model";

// create Exam Submission
const createExamSubmission = async (
  payload: IExamSubmission
): Promise<IExamSubmission> => {
  // if the provided user_id have the user or not in db
  const { user_id, exam_id } = payload;
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  // if the provided exam_id have the exam or not in db
  const exam = await Exam.findById(exam_id);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam not found!");
  }

  const result = await ExamSubmission.create(payload);

  return result;
};

// get all Exam Submission
const getAllExamSubmissions = async (): Promise<IExamSubmission[]> => {
  const result = await ExamSubmission.find({});

  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No exam submission found!");
  }
  return result;
};

// get single Exam Submission
const getSingleExamSubmission = async (
  id: string
): Promise<IExamSubmission | null> => {
  const result = await ExamSubmission.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam submission not found!");
  }

  return result;
};

// update Exam Submission
const updateExamSubmission = async (
  id: string,
  payload: Partial<IExamSubmission>
): Promise<IExamSubmission | null> => {
  const result = await ExamSubmission.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Exam submission was not found!"
    );
  }

  return result;
};

// delete Exam Submission
const deleteExamSubmission = async (id: string) => {
  const result = await ExamSubmission.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Exam submission wasn't found!"
    );
  }
  return result;
};

export const ExamSubmissionService = {
  createExamSubmission,
  getAllExamSubmissions,
  getSingleExamSubmission,
  updateExamSubmission,
  deleteExamSubmission,
};
