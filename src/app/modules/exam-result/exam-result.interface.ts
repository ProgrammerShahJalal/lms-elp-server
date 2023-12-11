import { Types } from "mongoose";

export interface IExamResult {
  user_id: Types.ObjectId;
  exam_id: Types.ObjectId;
  total_mark: Number;
  total_mark_obtained: Number;
  isApproved?: Boolean;
}
