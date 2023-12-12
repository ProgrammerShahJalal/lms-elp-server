import { Types } from "mongoose";

export interface ISubCategory {
  name: string;
  icon_link?: string;
  category_id: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}
