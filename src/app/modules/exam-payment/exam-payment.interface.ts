import { Types } from "mongoose";
import { IExam } from "../exam/exam.interface";
import { IUser } from "../user/user.interface";

export interface IExamPayment {
  user_id: Types.ObjectId | IUser;
  exam_id: Types.ObjectId | IExam;
  trx_id: string;
}

export type IExamPaymentFilters = {
  searchTerm?: string;
  user_id?: string;
  exam_id?: string;
  trx_id?: string;
};
