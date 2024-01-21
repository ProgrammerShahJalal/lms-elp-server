import { Schema, model } from "mongoose";
import { IOrderStatus } from "./order-status.interface";

const orderStatusSchema = new Schema<IOrderStatus>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    order_details_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "OrderDetails",
    },
    shipping_address_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ShippingAddress",
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

orderStatusSchema.index(
  { user_id: 1, order_details_id: 1, status: 1 },
  { unique: true }
);

export const OrderStatus = model<IOrderStatus>(
  "OrderStatus",
  orderStatusSchema
);
