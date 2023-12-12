import { Types } from "mongoose";
import { ENUM_USER_ROLE } from "../../enums/user";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email?: string;
  contact_no?: string;
  role: ENUM_USER_ROLE;
  password: string;
}

export type ILoginInfo = {
  email_or_contact: string;
  password: string;
};

export type IRegisterResponse = Omit<IUser, "password"> & {
  accessToken: string;
  refreshToken: string;
};
