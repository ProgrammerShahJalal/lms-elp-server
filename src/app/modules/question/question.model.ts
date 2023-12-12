import { Schema, model } from "mongoose";
import { IQuestion } from "./question.interface";

const questionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    correct_answer: { type: String },
    mark: { type: Number, required: true },
    exam_id: { type: Schema.Types.ObjectId, ref: "Exam" },
  },
  {
    timestamps: true,
  }
);

questionSchema.index({ question: 1, exam_id: 1 }, { unique: true });

export const Question = model<IQuestion>("Question", questionSchema);
