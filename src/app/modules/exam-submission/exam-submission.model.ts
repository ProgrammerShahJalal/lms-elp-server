import { Schema, model } from "mongoose";
import { IExamSubmission } from "./exam-submission.interface";

const examSubmissionSchema = new Schema<IExamSubmission>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    exam_id: { type: Schema.Types.ObjectId, required: true, ref: "Exam" },
    answer_link: { type: String, required: true },
  },
  { timestamps: true }
);

examSubmissionSchema.index(
  { user_id: 1, exam_id: 1, answer_link: 1 },
  { unique: true }
);

export const ExamSubmission = model<IExamSubmission>(
  "ExamSubmission",
  examSubmissionSchema
);
