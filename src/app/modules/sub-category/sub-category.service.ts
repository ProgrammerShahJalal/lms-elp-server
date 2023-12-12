import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ISubCategory } from "./sub-category.interface";
import { SubCategory } from "./sub-category.model";
import { Category } from "../category/category.model";

// create SubCategory
const createSubCategory = async (
  payload: ISubCategory
): Promise<ISubCategory> => {
  // check if the category found of payload category_id
  const category = await Category.findById(payload.category_id);
  if (!category) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Category not found of your category id"
    );
  }

  const result = (await await SubCategory.create(payload)).populate(
    "category_id"
  );
  return result;
};

// get all sub-categories
const getAllSubCategories = async (): Promise<ISubCategory[]> => {
  const result = await SubCategory.find({}).populate("category_id");

  // if there is no SubCategory, throw error
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No SubCategory found!");
  }

  return result;
};

// get SubCategory
const getSingleSubCategory = async (
  id: string
): Promise<ISubCategory | null> => {
  const result = await SubCategory.findById(id);

  // if the SubCategory is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "SubCategory not found!");
  }

  return result;
};

// update SubCategory
const updateSubCategory = async (
  id: string,
  payload: Partial<ISubCategory>
): Promise<ISubCategory | null> => {
  // updating SubCategory
  const result = await SubCategory.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  // if the SubCategory you want to update was not present, i.e. not updated, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. SubCategory not found!"
    );
  }

  return result;
};

// delete user
const deleteSubCategory = async (id: string) => {
  // find and delete SubCategory in one operation
  const result = await SubCategory.findOneAndDelete({ _id: id });

  // if the SubCategory you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. SubCategory not found!"
    );
  }

  return result;
};

export const SubCategoryService = {
  createSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
