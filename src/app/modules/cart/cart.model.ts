import { Schema, model } from "mongoose";
import { ICart } from "./cart.interface";

const cartSchema = new Schema<ICart>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    book_id: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
    quantity: { type: Number },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

cartSchema.index({ user_id: 1, book_id: 1 }, { unique: true });

export const Cart = model<ICart>("Cart", cartSchema);
