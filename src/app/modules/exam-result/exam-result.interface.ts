import { Types } from "mongoose";

export interface IExamResult {
  user_id: Types.ObjectId;
  exam_id: Types.ObjectId;
  exam_type: "0" | "1";
  answer: string;
  total_marks: number;
  total_correct_answer: number;
  total_wrong_answer: number;
  isApproved?: boolean;
}
