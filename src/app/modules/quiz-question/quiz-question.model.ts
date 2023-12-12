import { Schema, model } from "mongoose";
import { IQuizQuestion } from "./quiz-question.interface";

const quizQuestionSchema = new Schema<IQuizQuestion>(
  {
    question: { type: String, required: true },
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    d: { type: String, required: true },
    correct_answer: { type: String, required: true },
    exam_id: { type: Schema.Types.ObjectId, ref: "Exam" },
  },
  {
    timestamps: true,
  }
);

quizQuestionSchema.index({ question: 1, exam_id: 1 }, { unique: true });

export const QuizQuestion = model<IQuizQuestion>(
  "QuizQuestion",
  quizQuestionSchema
);
