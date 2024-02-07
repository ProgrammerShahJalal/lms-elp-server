import { Schema, model } from "mongoose";
import { IPayment } from "./payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    trxID: {
      type: String,
      unique: true,
      sparse: true,
    },
    paymentID: {
      type: String,
      unique: true,
      sparse: true,
    },
    payment_ref_id: {
      type: String,
      unique: true,
      sparse: true,
    },
    amount: {
      type: String,
      required: true,
    },
    customerMsisdn: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Payment = model<IPayment>("Payment", paymentSchema);
