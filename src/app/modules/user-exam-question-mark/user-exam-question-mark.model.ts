import { Schema, model } from "mongoose";
import { IUserExamQuestionMark } from "./user-exam-question-mark.interface";

const userExamQuestionMarkSchema = new Schema<IUserExamQuestionMark>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    exam_id: { type: Schema.Types.ObjectId, required: true, ref: "Exam" },
    question_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    mark_obtained: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userExamQuestionMarkSchema.index(
  { user_id: 1, exam_id: 1, question_id: 1 },
  { unique: true }
);

export const UserExamQuestionMark = model<IUserExamQuestionMark>(
  "UserExamQuestionMark",
  userExamQuestionMarkSchema
);
