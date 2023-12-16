import { Types } from "mongoose";

export interface ICart {
  user_id: Types.ObjectId;
  book_id: Types.ObjectId;
  quantity?: number;
}

export type ICartFilters = {
  user_id?: Types.ObjectId;
  book_id?: Types.ObjectId;
};
