import bcrypt from "bcrypt";
import config from "../../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userData: IUser) => {
  const { password, ...otherData } = userData;

  // Generate a salt synchronously
  const saltRounds = parseInt(config.jwt.bcrypt_salt_rounds as string) || 12;
  const salt = bcrypt.genSaltSync(saltRounds);

  // Hash the password synchronously
  const hashedPassword = bcrypt.hashSync(password, salt);

  const result = await User.create({ ...otherData, password: hashedPassword });

  const { password: createdPass, ...dataWithoutPassword } = result.toObject();
  return dataWithoutPassword;
};

export const UserUtills = {
  createUser,
};
