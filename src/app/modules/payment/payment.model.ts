import { Schema, model } from "mongoose";
import { IPayment } from "./payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    trxID: {
      type: String,
      unique: true,
    },
    paymentID: {
      type: String,
      unique: true,
    },
    amount: {
      type: String,
    },
    customerMsisdn: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Payment = model<IPayment>("Payment", paymentSchema);
