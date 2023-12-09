import { Schema, model } from "mongoose";
import { IShippingAddress } from "./shipping-address.interface";

const shippingAddressSchema = new Schema<IShippingAddress>({
  user_id: { type: String, required: true },
  division: { type: String, required: true },
  district: { type: String, required: true },
  upazilla: { type: String, required: true },
  address: { type: String, required: true },
  contact_no: { type: String, required: true },
  is_default: { type: Boolean, required: true },
  billing_name: { type: String, required: true },
});

export const ShippingAddress = model<IShippingAddress>(
  "ShippingAddress",
  shippingAddressSchema
);
