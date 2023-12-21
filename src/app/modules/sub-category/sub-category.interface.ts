import { Types } from "mongoose";
import { ICategory } from "../category/category.interface";

export interface ISubCategory {
  name: string;
  icon?: string;
  category_id: Types.ObjectId | ICategory;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ISubCategoryFilters {
  searchTerm?: string;
  name?: string;
  category_id?: string;
}
