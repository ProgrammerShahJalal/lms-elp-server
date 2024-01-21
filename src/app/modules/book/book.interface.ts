import { Types } from "mongoose";

export interface IBook {
  title: string;
  writer?: string;
  price?: number;
  discount_price?: number;
  description?: string;
  cover_page?: string;
  format: "pdf" | "hard copy";
  sample_pdf_link?: string;
  pdf_link?: string;
  course_id?: Types.ObjectId[];
}

export interface IBookFilters {
  searchTerm?: string;
  title?: string;
  writer?: string;
  price?: number;
  discount_price?: number;
  description?: string;
  format?: string;
  sample_pdf_link?: string;
  pdf_link?: string;
}
