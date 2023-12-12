import { Schema, model } from "mongoose";
import { ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    membership_type: { type: String, required: true },
    sub_category_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SubCategory",
    },
    description: { type: String, required: true },
    banner: { type: String },
    syllabus: { type: String },
    study_materials: { type: String },
  },
  { timestamps: true }
);

courseSchema.index(
  { name: 1, membership_type: 1, sub_category_id: 1 },
  { unique: true }
);

export const Course = model<ICourse>("Course", courseSchema);
