import bcrypt from "bcrypt";
import config from "../../../config";
import { ILoginInfo, IUser, IUserFilters } from "./user.interface";
import { User } from "./user.model";
import { ENUM_USER_ROLE } from "../../enums/user";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { UserUtills } from "./user.utills";
import { userSearchableFields } from "./user.constants";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { IPaginationOptions } from "../../../interfaces/pagination";

// registering user/student
const registerUser = async (userData: IUser) => {
  userData.role = ENUM_USER_ROLE.STUDENT;

  const createdUser = await UserUtills.createUser(userData);

  const { accessToken, refreshToken } =
    await UserUtills.createTokenRefreshTokenForUser(createdUser);

  return { createdUser, accessToken, refreshToken };
};

// create admin
const createAdmin = async (userData: IUser) => {
  userData.role = ENUM_USER_ROLE.ADMIN;

  const createdUser = await UserUtills.createUser(userData);

  const { accessToken, refreshToken } =
    await UserUtills.createTokenRefreshTokenForUser(createdUser);

  return { createdUser, accessToken, refreshToken };
};

// creating super admin
const createSuperAdmin = async (userData: IUser) => {
  userData.role = ENUM_USER_ROLE.SUPER_ADMIN;

  const createdUser = await UserUtills.createUser(userData);

  const { accessToken, refreshToken } =
    await UserUtills.createTokenRefreshTokenForUser(createdUser);

  return { createdUser, accessToken, refreshToken };
};

// login user
const login = async (loginInfo: ILoginInfo) => {
  const { email_or_contact, password } = loginInfo;

  const requestedUser = await User.findOne({
    $or: [
      { contact_no: { $exists: true, $ne: null, $eq: email_or_contact } },
      { email: { $exists: true, $ne: null, $eq: email_or_contact } },
    ],
  });

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

  const { accessToken, refreshToken } =
    await UserUtills.createTokenRefreshTokenForUser(requestedUser);

  return { isPasswordMatched, accessToken, refreshToken };
};

// get all users
const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };

  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No user found!");
  }

  return result;
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
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
