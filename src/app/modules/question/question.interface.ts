import { Types } from "mongoose";

export interface IQuestion {
  question: string;
  options?: { [key: string]: string }[];
  correct_answer?: string;
  exam_id?: Types.ObjectId;
  mark: number;
  exam_type: "0" | "1";
}

export type IQuestionFilters = {
  searchTerm?: string;
  question?: string;
  correct_answer?: string;
  exam_type?: "0" | "1";
  exam_id?: Types.ObjectId;
  mark?: number;
};
