import { Types } from "mongoose";

export interface IShippingAddress {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  division: string;
  district: string;
  upazilla: string;
  address: string;
  contact_no: string;
  billing_name: string;
}
