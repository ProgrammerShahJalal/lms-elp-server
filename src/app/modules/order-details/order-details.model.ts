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
    payment_ref_id: {
      type: String,
      unique: true,
      sparse: true,
    },
    trx_id: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

if (orderDetailsSchema.paths.trx_id) {
  orderDetailsSchema.index(
    { user_id: 1, trx_id: 1, shipping_address_id: 1 },
    { unique: true }
  );
} else if (orderDetailsSchema.paths.payment_ref_id) {
  orderDetailsSchema.index(
    { user_id: 1, payment_ref_id: 1, shipping_address_id: 1 },
    { unique: true }
  );
}

export const OrderDetails = model<IOrderDetails>(
  "OrderDetails",
  orderDetailsSchema
);
