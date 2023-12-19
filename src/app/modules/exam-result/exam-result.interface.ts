import { Types } from "mongoose";

export interface IQuestionMark {
  question_id: Types.ObjectId;
  mark_obtained: number;
}

export interface IExamResult {
  user_id: Types.ObjectId;
  exam_id: Types.ObjectId;
  exam_type: "0" | "1"; // 0->quiz, 1->written
  answer?: string; // json
  question_mark?: IQuestionMark[];
  total_marks: number;
  total_correct_answer?: number;
  total_wrong_answer?: number;
  isApproved?: boolean;
}

export interface IExamQuestionMarkPayload {
  user_id: Types.ObjectId;
  exam_id: Types.ObjectId;
  marks: IQuestionMark[];
}

export interface IExamResultFilters {
  searchTerm?: string;
  user_id?: Types.ObjectId;
  exam_id?: Types.ObjectId;
  exam_type?: "0" | "1";
  total_marks?: number;
  total_correct_answer?: number;
  total_wrong_answer?: number;
  isApproved?: boolean;
}
