import { Types } from "mongoose";

export interface IExam {
  title: string;
  description: string;
  total_marks: number;
  duration_in_minutes: number;
  fee: number;
  is_active: boolean;
  exam_type: "0" | "1";
  course_id: Types.ObjectId;
}

export type IExamFilters = {
  searchTerm?: string;
  title?: string;
  total_marks?: number;
  duration_in_minutes?: number;
  fee?: string;
  is_active?: number;
  exam_type?: string;
  course_id?: string;
};
