import { Schema, model } from "mongoose";
import { IOrderDetails } from "./order-details.interface";

const orderDetailsSchema = new Schema<IOrderDetails>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    shipping_address_id: {
      type: Schema.Types.ObjectId,
      ref: "ShippingAddress",
    },
    shipping_address: {
      type: String,
    },
    total_price: {
      type: Number,
      required: true,
    },
    discounts: {
      type: Number,
    },
    orders: {
      type: String,
      required: true,
    },
    trx_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

orderDetailsSchema.index(
  { user_id: 1, trx_id: 1, shipping_address_id: 1 },
  { unique: true }
);

export const OrderDetails = model<IOrderDetails>(
  "OrderDetails",
  orderDetailsSchema
);
