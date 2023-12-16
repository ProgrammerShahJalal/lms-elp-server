import { Types } from "mongoose";

export interface IOrder {
  user_id: Types.ObjectId;
  book_id: Types.ObjectId;
  book_quantity: number;
  unit_price: number;
}

export interface IOrderFilters {
  searchTerm?: string;
  user_id?: Types.ObjectId;
  book_id?: Types.ObjectId;
  book_quantity?: number;
  unit_price?: number;
}
