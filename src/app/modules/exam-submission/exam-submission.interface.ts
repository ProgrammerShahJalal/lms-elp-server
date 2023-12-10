import { Types } from "mongoose";

export interface IExamSubmission {
  user_id: Types.ObjectId;
  exam_id: Types.ObjectId;
  answer_link: String;
}
