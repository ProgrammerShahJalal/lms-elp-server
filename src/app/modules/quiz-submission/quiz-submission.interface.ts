import { Types } from "mongoose";
import { ENUM_QUIZ_OPTIONS } from "../../enums/quiz_options";

export interface IQuizSubmission {
  user_id: Types.ObjectId;
  exam_id: Types.ObjectId;
  quiz_question_id: Types.ObjectId;
  answer: ENUM_QUIZ_OPTIONS;
}
