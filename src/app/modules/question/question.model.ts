import { Schema, model } from "mongoose";
import { IQuestion } from "./question.interface";

const questionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  a: { type: String },
  b: { type: String },
  c: { type: String },
  d: { type: String },
  correct_answer: { type: String },
  exam_id: { type: String },
  question_type: { type: String },
});

export const Question = model<IQuestion>("Question", questionSchema);
