import { Types } from "mongoose";

export interface IQuestion {
  question: string;
  correct_answer?: string;
  mark: number;
  exam_id?: Types.ObjectId;
}
