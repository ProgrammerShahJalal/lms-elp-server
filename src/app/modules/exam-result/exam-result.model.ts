import { Schema, model } from "mongoose";
import { IExamResult } from "./exam-result.interface";

const examResultSchema = new Schema<IExamResult>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    exam_id: { type: Schema.Types.ObjectId, required: true, ref: "Exam" },
    total_marks: { type: Number, required: true },
    total_mark_obtained: { type: Number, required: true },
    isApproved: { type: Boolean },
  },
  { timestamps: true }
);

examResultSchema.index({ user_id: 1, exam_id: 1 }, { unique: true });

export const ExamResult = model<IExamResult>("ExamResult", examResultSchema);
