import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IExamPayment } from "./exam-payment.interface";
import { User } from "../user/user.model";
import { Exam } from "../exam/exam.model";
import { ExamPayment } from "./exam-payment.model";
import { Payment } from "../payment/payment.model";

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

  const validPayment = await Payment.findOne({ trxID: payload?.trx_id });

  if (!validPayment) {
    throw new ApiError(httpStatus.OK, "Invalid transaction id!");
  }

  if (Number(exam?.fee) > Number(validPayment?.amount)) {
    throw new ApiError(httpStatus.OK, "Invalid payment amount!");
  }

  const result = await ExamPayment.create(payload);

  return result;
};

// get all Exam Payments
const getAllExamPayments = async (): Promise<IExamPayment[]> => {
  const result = await ExamPayment.find({})
    .populate({
      path: "exam_id",
      populate: {
        path: "course_id",
        populate: {
          path: "sub_category_id",
          populate: {
            path: "category_id",
          },
        },
      },
    })
    .populate("user_id");

  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No exam payment found!");
  }
  return result;
};

// get all Exam Payments
const getMyExamPayments = async (user_id: string): Promise<IExamPayment[]> => {
  const result = await ExamPayment.find({
    user_id,
  }).populate({
    path: "exam_id",
    populate: {
      path: "course_id",
      populate: {
        path: "sub_category_id",
        populate: {
          path: "category_id",
        },
      },
    },
  });

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
  getMyExamPayments,
  getSingleExamPayment,
  updateExamPayment,
  deleteExamPayment,
};
