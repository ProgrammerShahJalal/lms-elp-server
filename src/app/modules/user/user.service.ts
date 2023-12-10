import bcrypt from "bcrypt";
import config from "../../../config";
import { ILoginInfo, IUser } from "./user.interface";
import { User } from "./user.model";
import { ENUM_USER_ROLE } from "../../enums/user";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { UserUtills } from "./user.utills";

// registering user/student
const registerUser = async (
  userData: IUser
): Promise<Omit<IUser, "password">> => {
  userData.role = ENUM_USER_ROLE.STUDENT;

  const createdUser = await UserUtills.createUser(userData);

  return createdUser;
};

// create admin
const createAdmin = async (
  userData: IUser
): Promise<Omit<IUser, "password">> => {
  userData.role = ENUM_USER_ROLE.ADMIN;

  const createdAdmin = await UserUtills.createUser(userData);

  return createdAdmin;
};

// creating super admin
const createSuperAdmin = async (
  userData: IUser
): Promise<Omit<IUser, "password">> => {
  userData.role = ENUM_USER_ROLE.SUPER_ADMIN;

  const createdSuperAdmin = await UserUtills.createUser(userData);

  return createdSuperAdmin;
};

// login user
const login = async (loginInfo: ILoginInfo) => {
  const { contact_no, email, password } = loginInfo;

  const requestedUser = await User.findOne({
    $or: [
      { contact_no: { $exists: true, $ne: null, $eq: contact_no } },
      { email: { $exists: true, $ne: null, $eq: email } },
    ],
  });
  // const requestedUser = await User.findOne({ email: email });

  if (!requestedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // compare password
  const isPasswordMatched = bcrypt.compareSync(
    password,
    requestedUser?.password as string
  );

  // if password doesn't match, throw error
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials!");
  }

  // creating payload for token
  const payload = {
    userId: requestedUser._id,
    role: requestedUser.role,
  };

  // creating access token
  const accessToken = jwtHelpers.createToken(
    payload,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  // creating refresh token
  const refreshToken = jwtHelpers.createToken(
    payload,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  return { isPasswordMatched, accessToken, refreshToken };
};

// get single user
const getSingleUser = async (id: string): Promise<Omit<IUser, "password">> => {
  const result = await User.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const { password, ...otherData } = result.toObject();
  return otherData;
};

// update user
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<Omit<IUser, "password">> => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const { password, ...otherData } = result.toObject();
  return otherData;
};

// delete user
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  return result;
};

export const UserService = {
  registerUser,
  createSuperAdmin,
  createAdmin,
  login,
  getSingleUser,
  updateUser,
  deleteUser,
};
