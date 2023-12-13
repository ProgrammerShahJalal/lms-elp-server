import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ISubCategory, ISubCategoryFilters } from "./sub-category.interface";
import { SubCategory } from "./sub-category.model";
import { Category } from "../category/category.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { subCategorySearchableFields } from "./sub-category.constants";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";

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
const getAllSubCategories = async (
  filters: ISubCategoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISubCategory[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: subCategorySearchableFields.map((field) => ({
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

  const result = await SubCategory.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "category_id",
      select: "-createdAt -updatedAt -__v",
    })
    .select("-createdAt -updatedAt -__v");
  const total = await SubCategory.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get SubCategory
const getSingleSubCategory = async (
  id: string
): Promise<ISubCategory | null> => {
  const result = await SubCategory.findById(id)
    .populate({
      path: "category_id",
      select: "-createdAt -updatedAt -__v",
    })
    .select("-createdAt -updatedAt -__v");

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
