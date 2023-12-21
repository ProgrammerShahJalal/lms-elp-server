import httpStatus from "http-status";
import fs from "fs/promises";
import path from "path";
import ApiError from "../../../errors/ApiError";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";
import sharp from "sharp";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";

// create category
const createCategory = async (req: Request) => {
  if (req.file) {
    const file = req.file as IUploadFile;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.icon = uploadedImage.secure_url;
    }
  }

  const result = await Category.create(req.body);
  return result;
};

// get all categories
const getAllCategorys = async (): Promise<ICategory[]> => {
  const result = await Category.find({});

  // if there is no category, throw error
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No category found!");
  }

  return result;
};

// get category
const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findById(id);

  // if the category is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!");
  }

  return result;
};

// update category
const updateCategory = async (
  id: string,
  payload: Partial<ICategory>
): Promise<ICategory | null> => {
  // updating category
  const result = await Category.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  // if the category you want to update was not present, i.e. not updated, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Category not found!"
    );
  }

  return result;
};

// delete user
const deleteCategory = async (id: string) => {
  // find and delete category in one operation
  const result = await Category.findOneAndDelete({ _id: id });

  // if the category you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Category not found!"
    );
  }

  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategorys,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
