import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "../book/book.constants";
import { paginationFields } from "../../constants/pagination";
import { userFilterableFields } from "./user.constants";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.registerUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.env === "production",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully!",
    data: result,
  });
});

const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createSuperAdmin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Super admin created successfully!",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin created successfully!",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.login(req.body);

  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.env === "production",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users fetched in successfully!",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User fetched in successfully!",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUser(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User updated in successfully!",
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted in successfully!",
    data: result,
  });
});

export const UserController = {
  registerUser,
  createSuperAdmin,
  createAdmin,
  login,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
