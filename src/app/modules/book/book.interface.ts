import { Types } from "mongoose";

export interface IBook {
  name: string;
  price?: number;
  discount_price?: number;
  description?: string;
  cover_page?: string;
  format: "pdf" | "hard copy";
  pdf_link?: string;
  course_id?: Types.ObjectId;
}
