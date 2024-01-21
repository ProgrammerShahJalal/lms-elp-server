import { Schema, model } from "mongoose";
import { IExamPayment } from "./exam-payment.interface";

const examPaymentSchema = new Schema<IExamPayment>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    exam_id: { type: Schema.Types.ObjectId, required: true, ref: "Exam" },
    trx_id: { type: String, required: true, unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

examPaymentSchema.index(
  { user_id: 1, exam_id: 1, trx_id: 1 },
  { unique: true }
);

export const ExamPayment = model<IExamPayment>(
  "ExamPayment",
  examPaymentSchema
);
