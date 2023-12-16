import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    icon_link: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Category = model<ICategory>("Category", categorySchema);
