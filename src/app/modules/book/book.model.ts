import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    name: { type: String, required: true },
    price: { type: Number },
    discount_price: { type: Number },
    description: { type: String },
    cover_page: { type: String },
    format: { type: String, required: true },
    pdf_link: { type: String },
    course_id: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true }
);

bookSchema.index(
  { name: 1, price: 1, format: 1, is_paid: 1 },
  { unique: true }
);

export const Book = model<IBook>("Book", bookSchema);
