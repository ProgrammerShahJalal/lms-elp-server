import { Schema, model } from "mongoose";
import { IExamResult } from "./exam-result.interface";

const examResultSchema = new Schema<IExamResult>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    exam_id: { type: Schema.Types.ObjectId, required: true, ref: "Exam" },
    exam_type: { type: String, enum: ["0", "1"], required: true },
    answer: { type: String, required: true },
    question_mark: {
      question_id: { type: Schema.Types.ObjectId },
      mark_obtained: { type: Number },
    },
    total_marks: { type: Number, required: true },
    total_correct_answer: { type: Number },
    total_wrong_answer: { type: Number },
    isApproved: { type: Boolean },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

examResultSchema.index({ user_id: 1, exam_id: 1 }, { unique: true });

export const ExamResult = model<IExamResult>("ExamResult", examResultSchema);
