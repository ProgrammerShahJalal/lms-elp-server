import { Schema, model } from "mongoose";
import { IQuizSubmission } from "./quiz-submission.interface";

const quizSubmissionSchema = new Schema<IQuizSubmission>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    exam_id: { type: Schema.Types.ObjectId, required: true, ref: "Exam" },
    quiz_question_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "QuizQuestion",
    },
    answer: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

quizSubmissionSchema.index(
  { user_id: 1, exam_id: 1, quiz_question_id: 1, answer: 1 },
  { unique: true }
);

export const QuizSubmission = model<IQuizSubmission>(
  "QuizSubmission",
  quizSubmissionSchema
);
