import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    writer: { type: String },
    price: { type: Number },
    discount_price: { type: Number },
    description: { type: String },
    cover_page: { type: String },
    format: { type: String, required: true },
    pdf_link: { type: String },
    course_id: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

bookSchema.index(
  { title: 1, writer: 1, price: 1, format: 1, is_paid: 1 },
  { unique: true }
);

export const Book = model<IBook>("Book", bookSchema);
