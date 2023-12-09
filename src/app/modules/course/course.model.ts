import { Schema, model } from "mongoose";
import { ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    membership_type: { type: String, required: true },
    sub_category_id: { type: String, required: true },
    description: { type: String, required: true },
    banner: { type: String },
    syllabus: { type: String },
    study_materials: { type: String },
  },
  { timestamps: true }
);

export const Course = model<ICourse>("Course", courseSchema);
