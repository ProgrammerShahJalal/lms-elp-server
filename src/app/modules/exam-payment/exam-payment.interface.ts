import { Types } from "mongoose";

export interface IExamPayment {
  user_id: Types.ObjectId;
  exam_id: Types.ObjectId;
  invalid_date?: Date;
  trx_id: string;
  payment_date: Date;
}
