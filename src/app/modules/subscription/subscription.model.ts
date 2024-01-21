import { Schema, model } from "mongoose";
import { ISubscription } from "./subscription.interface";

const subscriptionSchema = new Schema<ISubscription>(
  {
    name: { type: String },
    subscription_duration_in_months: { type: Number, required: true },
    cost: { type: Number, required: true },
    logo: { type: String },
    description: { type: String },
    course_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

subscriptionSchema.index(
  { subcription_duration_in_months: 1, cost: 1, name: 1, course_id: 1 },
  { unique: true }
);

export const Subscription = model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
