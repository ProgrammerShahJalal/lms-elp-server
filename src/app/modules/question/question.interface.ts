import { Types } from "mongoose";
import { ENUM_QUIZ_OPTIONS } from "../../enums/quiz_options";

export interface IQuestion {
  question: string;
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  correct_answer?: ENUM_QUIZ_OPTIONS | string | null;
  exam_id: Types.ObjectId;
  question_type: "0" | "1";
}
