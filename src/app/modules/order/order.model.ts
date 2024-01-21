import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    book_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },

    book_quantity: {
      type: Number,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Order = model<IOrder>("Order", orderSchema);
