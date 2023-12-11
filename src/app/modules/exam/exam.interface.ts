import { Types } from "mongoose";

export interface IExam {
  name: string;
  description: string;
  total_marks: number;
  duration_in_minutes: number;
  cost: number;
  is_active: boolean;
  exam_type: "0" | "1";
  course_id: Types.ObjectId;
}
