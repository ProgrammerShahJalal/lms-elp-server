import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { SubCategoryService } from "./sub-category.service";

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await SubCategoryService.createSubCategory(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "SubCategory added successfully!",
    data: result,
  });
});

const getAllSubCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await SubCategoryService.getAllSubCategories();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All SubCategories fetched successfully!",
    data: result,
  });
});

const getSingleSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubCategoryService.getSingleSubCategory(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "SubCategory fetched successfully!",
    data: result,
  });
});

const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await SubCategoryService.updateSubCategory(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "SubCategory updated in successfully!",
    data: result,
  });
});
const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubCategoryService.deleteSubCategory(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "SubCategory deleted in successfully!",
    data: result,
  });
});

export const SubCategoryController = {
  createSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
