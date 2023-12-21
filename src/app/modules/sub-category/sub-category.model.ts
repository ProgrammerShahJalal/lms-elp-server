import { Schema, model } from "mongoose";
import { ISubCategory } from "./sub-category.interface";

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    icon: { type: String },
    category_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

subCategorySchema.index({ name: 1, category_id: 1 }, { unique: true });

export const SubCategory = model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);
