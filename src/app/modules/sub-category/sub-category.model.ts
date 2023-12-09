import { Schema, model } from "mongoose";
import { ISubCategory } from "./sub-category.interface";

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    icon_link: { type: String },
    category_id: { type: String, required: true },
  },
  { timestamps: true }
);

export const SubCategory = model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);
