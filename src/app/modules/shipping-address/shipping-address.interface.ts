import { Types } from "mongoose";

export interface IShippingAddress {
  user_id: Types.ObjectId;
  division: string;
  district: string;
  upazilla: string;
  address: string;
  contact_no: string;
  is_default: boolean;
  billing_name: string;
}
