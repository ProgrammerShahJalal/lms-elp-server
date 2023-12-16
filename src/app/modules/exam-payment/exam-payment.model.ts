import { Schema, model } from "mongoose";
import { IExamPayment } from "./exam-payment.interface";

const examPaymentSchema = new Schema<IExamPayment>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    exam_id: { type: Schema.Types.ObjectId, required: true, ref: "Exam" },
    invalid_date: { type: Date },
    trx_id: { type: String, required: true },
    payment_date: { type: Date },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

examPaymentSchema.index(
  { user_id: 1, exam_id: 1, payment_id: 1 },
  { unique: true }
);

export const ExamPayment = model<IExamPayment>(
  "ExamPayment",
  examPaymentSchema
);
