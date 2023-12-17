import { Types } from "mongoose";

export interface IQuestion {
  question: string;
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  correct_answer?: string;
  exam_id?: Types.ObjectId;
  mark: number;
  exam_type: "0" | "1";
}

export type IQuestionFilters = {
  searchTerm?: string;
  question?: string;
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  correct_answer?: string;
  exam_type?: "0" | "1";
  exam_id?: Types.ObjectId;
  mark?: number;
};
