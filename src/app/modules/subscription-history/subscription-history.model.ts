import { Schema, model } from "mongoose";
import { ISubscriptionHistory } from "./subscription-history.interface";

const subscriptionHistorySchema = new Schema<ISubscriptionHistory>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    course_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    subscription_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Subscription",
    },
    expire_date: { type: Date, required: true },
    amount: { type: Number, required: true },
    trx_id: { type: String, sparse: true },
    payment_ref_id: { type: String, sparse: true },
    is_active: { type: Boolean },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

subscriptionHistorySchema.index({ user_id: 1, trx_id: 1 }, { unique: true });

export const SubscriptionHistory = model<ISubscriptionHistory>(
  "SubscriptionHistory",
  subscriptionHistorySchema
);
