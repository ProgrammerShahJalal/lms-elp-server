import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Course } from "../course/course.model";
import { IExamPayment } from "./exam-payment.interface";
import { User } from "../user/user.model";
import { Exam } from "../exam/exam.model";
import { ExamPayment } from "./exam-payment.model";
import axios from "axios";
import config from "../../../config";

// create Exam Payment
const createExamPayment = async (
  payload: IExamPayment
): Promise<IExamPayment> => {
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

  const result = await ExamPayment.create(payload);

  return result;
};

// get all Exam Payments
const getAllExamPayments = async (): Promise<IExamPayment[]> => {
  const result = await ExamPayment.find({});

  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No exam payment found!");
  }
  return result;
};

// get single Exam Payment
const getSingleExamPayment = async (
  id: string
): Promise<IExamPayment | null> => {
  const result = await ExamPayment.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam payment not found!");
  }

  return result;
};

// update Exam Payment
const updateExamPayment = async (
  id: string,
  payload: Partial<IExamPayment>
): Promise<IExamPayment | null> => {
  const result = await ExamPayment.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Exam payment was not found!"
    );
  }

  return result;
};

// delete Exam Payment
const deleteExamPayment = async (id: string) => {
  const result = await ExamPayment.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Exam payment wasn't found!"
    );
  }
  return result;
};

export const ExamPaymentService = {
  createExamPayment,
  getAllExamPayments,
  getSingleExamPayment,
  updateExamPayment,
  deleteExamPayment,
};
