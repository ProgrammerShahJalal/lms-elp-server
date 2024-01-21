import { Schema, model } from "mongoose";
import { IExam } from "./exam.interface";

const examSchema = new Schema<IExam>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    total_marks: { type: Number, required: true },
    duration_in_minutes: { type: Number, required: true },
    fee: { type: Number, required: true },
    is_active: { type: Boolean, required: true, default: false },
    exam_type: { type: String, required: true },
    course_id: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

examSchema.index(
  { title: 1, course_id: 1, sub_category_id: 1, exam_type: 1, is_active: 1 },
  { unique: true }
);

export const Exam = model<IExam>("Exam", examSchema);
