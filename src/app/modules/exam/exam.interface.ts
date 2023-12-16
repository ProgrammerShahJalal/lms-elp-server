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

export type IExamFilters = {
  searchTerm?: string;
  name?: string;
  total_marks?: number;
  duration_in_minutes?: number;
  cost?: string;
  is_active?: number;
  exam_type?: string;
  course_id?: string;
};
