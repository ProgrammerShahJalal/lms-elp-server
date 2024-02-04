import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IExamPayment, IExamPaymentFilters } from "./exam-payment.interface";
import { User } from "../user/user.model";
import { Exam } from "../exam/exam.model";
import { ExamPayment } from "./exam-payment.model";
import { Payment } from "../payment/payment.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { examPaymentSearchableFields } from "./exam-payment.constants";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { PaymentUtills } from "../payment/payment.utills";

// create Exam Payment
const createExamPayment = async (
  payload: IExamPayment
): Promise<IExamPayment> => {
  // if the provided user_id have the user or not in db
  const { user_id, exam_id, trx_id, payment_ref_id } = payload;
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.OK, "User not found!");
  }
  // if the provided exam_id have the exam or not in db
  const exam = await Exam.findById(exam_id);
  if (!exam) {
    throw new ApiError(httpStatus.OK, "Exam not found!");
  }

  const validPayment = await PaymentUtills.validPayment({
    trx_id,
    payment_ref_id,
  });

  if (Number(exam?.fee) !== Number(validPayment?.amount)) {
    throw new ApiError(httpStatus.OK, "Invalid payment amount!");
  }

  const result = await ExamPayment.create(payload);

  return result;
};

// get all Exam Payments
const getAllExamPayments = async (
  filters: IExamPaymentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IExamPayment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: examPaymentSearchableFields.map((field) => ({
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

  const result = await ExamPayment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
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
  const total = await ExamPayment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
    throw new ApiError(httpStatus.OK, "No exam payment found!");
  }
  return result;
};

// get single Exam Payment
const getSingleExamPayment = async (
  id: string
): Promise<IExamPayment | null> => {
  const result = await ExamPayment.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.OK, "Exam payment not found!");
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
      httpStatus.OK,
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
      httpStatus.OK,
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
