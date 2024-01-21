import { Types } from "mongoose";
import { ISubCategory } from "../sub-category/sub-category.interface";

export interface ICourse {
  title: string;
  author?: string;
  membership_type: "0" | "1";
  sub_category_id: Types.ObjectId | ISubCategory;
  category_id: Types.ObjectId | ISubCategory;
  description: string;
  banner?: string;
  syllabus?: string;
  routine?: string;
  study_materials?: string;
}

export interface ICourseFilters {
  searchTerm?: string;
  title?: string;
  author?: string;
  routine?: string;
  membership_type?: "0" | "1";
  sub_category_id?: string;
  category_id?: string;
}
