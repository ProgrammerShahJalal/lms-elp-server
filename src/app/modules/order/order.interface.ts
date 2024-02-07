import { Types } from "mongoose";

export interface IOrder {
  user_id: Types.ObjectId;
  book_id: Types.ObjectId;
  book_quantity: number;
  unit_price: number;
}

export interface IOrderCreatePayload {
  trx_id?: string;
  paymentID?: string;
  payment_ref_id?: string;
  shipping_address?: string;
  shipping_address_id?: string;
  books: {
    book_id: string;
    quantity: number;
  }[];
}

export interface IOrderFilters {
  searchTerm?: string;
  user_id?: Types.ObjectId;
  book_id?: Types.ObjectId;
  book_quantity?: number;
  unit_price?: number;
}
