import { ENUM_USER_ROLE } from "../../enums/user";

export interface IUser {
  name: string;
  email?: string;
  contact_no: string;
  role: ENUM_USER_ROLE;
  password: string;
}

export type ILoginInfo = {
  contact_no?: string;
  email?: string;
  password: string;
};
