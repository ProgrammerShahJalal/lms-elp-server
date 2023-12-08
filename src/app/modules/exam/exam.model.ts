import { Schema, model } from "mongoose";
import { IExam } from "./exam.interface";

const examSchema = new Schema<IExam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  total_marks: { type: Number, required: true },
  duration: { type: String, required: true },
  cost: { type: Number, required: true },
  is_active: { type: Boolean, required: true },
  is_paid: { type: Boolean, required: true },
  course_id: { type: String, required: true },
});

export const Exam = model<IExam>("Exam", examSchema);
