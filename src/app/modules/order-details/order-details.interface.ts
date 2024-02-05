import { Types } from "mongoose";

export interface IOrderDetails {
  user_id: Types.ObjectId;
  shipping_address_id?: Types.ObjectId;
  shipping_address?: string;
  shipping_charge?: number;
  total_price: number;
  discounts: number;
  orders: string; // json of orders
  trx_id?: string;
  payment_ref_id?: string;
}

export interface IOrderDetailsFilters {
  searchTerm?: string;
  user_id?: Types.ObjectId;
  shipping_id?: Types.ObjectId;
  shipping_charge?: number;
  total_price?: number;
  trx_id?: number;
  paymentMethod?: "bkash" | "nagad";
  discounts?: number;
}
