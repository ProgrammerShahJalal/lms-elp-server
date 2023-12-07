import { Schema, model } from "mongoose";
import { IShippingAddress } from "./shipping-address.interface";

const shippingAddressSchema = new Schema<IShippingAddress>({
  userId: { type: String, required: true },
  district: { type: String, required: true },
  upazilla: { type: String, required: true },
  address: { type: String, required: true },
});

export const ShippingAddress = model<IShippingAddress>(
  "ShippingAddress",
  shippingAddressSchema
);
