import { Types } from "mongoose";

export interface IExamPayment {
  user_id: Types.ObjectId;
  exam_id: Types.ObjectId;
  trx_id: string;
}
