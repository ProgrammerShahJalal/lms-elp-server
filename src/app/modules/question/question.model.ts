import { Schema, model } from "mongoose";
import { IQuestion } from "./question.interface";

const questionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    a: { type: String },
    b: { type: String },
    c: { type: String },
    d: { type: String },
    correct_answer: { type: String },
    exam_id: { type: Schema.Types.ObjectId, ref: "Exam" },
    question_type: { type: String },
  },
  {
    timestamps: true,
  }
);

questionSchema.index(
  { question: 1, exam_id: 1, question_type: 1 },
  { unique: true }
);

export const Question = model<IQuestion>("Question", questionSchema);
