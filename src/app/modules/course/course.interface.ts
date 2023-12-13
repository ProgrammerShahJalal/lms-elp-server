import { Types } from "mongoose";

export interface ICourse {
  name: string;
  membership_type: "free" | "paid";
  sub_category_id: Types.ObjectId;
  description: string;
  banner?: string;
  syllabus?: string;
  study_materials?: string;
}

export interface ICourseFilters {
  searchTerm?: string;
  name?: string;
  membership_type?: string;
  sub_category_id?: string;
}
