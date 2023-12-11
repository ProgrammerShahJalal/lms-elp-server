import { Types } from "mongoose";

export interface IUserExamQuestionMark {
  user_id: Types.ObjectId;
  exam_id: Types.ObjectId;
  question_id: Types.ObjectId;
  mark_obtained: number;
}
