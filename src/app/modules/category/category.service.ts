import httpStatus from "http-status";
import fs from "fs/promises";
import path from "path";
import ApiError from "../../../errors/ApiError";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";
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
const getAllCategories = async (): Promise<ICategory[]> => {
  const result = await Category.find({});

  // if there is no category, throw error
  if (!result.length) {
    throw new ApiError(httpStatus.OK, "No category found!");
  }

  return result;
};

// get category
const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findById(id);

  // if the category is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.OK, "Category not found!");
  }

  return result;
};

// update category
const updateCategory = async (req: Request): Promise<ICategory | null> => {
  // find category of given id
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new ApiError(httpStatus.OK, "Category not found!");
  }

  // if image is given, upload new, and delete old one
  if (req.file) {
    const file = req.file as IUploadFile;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.icon = uploadedImage.secure_url;
    }
    if (category.icon) {
      // delete that category icon from cloudinary
      FileUploadHelper.deleteFromCloudinary(category?.icon as string);
    }
  }

  // updating category
  const result = await Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  return result;
};

// delete category
const deleteCategory = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(httpStatus.OK, "Category not found!");
  } else {
    if (category.icon) {
      // delete that category icon from cloudinary
      FileUploadHelper.deleteFromCloudinary(category?.icon as string);
    }
  }

  // find and delete category in one operation
  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
