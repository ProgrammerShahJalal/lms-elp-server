import { Types } from "mongoose";

export interface IExam {
  name: string;
  description: string;
  total_marks: number;
  duration_in_minutes: number;
  cost: number;
  is_active: boolean;
  is_paid: boolean;
  course_id: Types.ObjectId;
}
