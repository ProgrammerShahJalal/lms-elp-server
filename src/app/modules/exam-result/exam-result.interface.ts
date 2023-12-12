import { Types } from "mongoose";

export interface IExamResult {
  user_id: Types.ObjectId;
  exam_id: Types.ObjectId;
  total_marks: number;
  total_mark_obtained: number;
  isApproved?: boolean;
}
