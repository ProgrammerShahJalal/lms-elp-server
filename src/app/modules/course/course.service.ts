import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICourse, ICourseFilters } from "./course.interface";
import { Course } from "./course.model";
import { SubCategory } from "../sub-category/sub-category.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { courseFilterableFields } from "./course.constants";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";

// create Course
const createCourse = async (req: Request): Promise<ICourse> => {
  // to check if the sub-category is present of the provided sub-category-id
  const { sub_category_id } = req.body;
  const subCategory = await SubCategory.findById(sub_category_id).populate(
    "category_id"
  );
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, "Sub category not found!");
  }
  // @ts-ignore
  req.body.category_id = subCategory.category_id._id.toString();

  if (req.file) {
    const file = req.file as IUploadFile;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.banner = uploadedImage.secure_url;
    }
  }

  const result = (await Course.create(req.body)).populate({
    path: "sub_category_id",
    select: "name _id",
    populate: {
      path: "category_id",
      select: "name _id",
    },
  });
  return result;
};

// get all courses

const getAllCourses = async (
  filters: ICourseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICourse[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: courseFilterableFields.map((field) => ({
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

  let result = await Course.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "sub_category_id",
      select: "name _id",
      populate: {
        path: "category_id",
        select: "name _id",
      },
    })
    .select("-createdAt -updatedAt -__v");
  const total = await Course.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get Course
const getSingleCourse = async (id: string): Promise<ICourse | null> => {
  const result = await Course.findById(id)
    .populate({
      path: "sub_category_id",
      select: "name _id",
      populate: {
        path: "category_id",
        select: "name _id",
      },
    })
    .select("-createdAt -updatedAt -__v");

  // if the Course is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  }

  return result;
};

// update Course
const updateCourse = async (req: Request): Promise<ICourse | null> => {
  // find course of given id
  const course = await Course.findById(req.params.id);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  }

  // if image is given, upload new, and delete old one
  if (req.file) {
    const file = req.file as IUploadFile;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.banner = uploadedImage.secure_url;
    }
    if (course.banner) {
      // delete that course banner image from cloudinary
      FileUploadHelper.deleteFromCloudinary(course?.banner as string);
    }
  }

  // updating course
  const result = await Course.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );

  return result;
};

// delete course
const deleteCourse = async (id: string) => {
  const course = await Course.findById(id);

  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  } else {
    if (course.banner) {
      // delete that course banner from cloudinary
      FileUploadHelper.deleteFromCloudinary(course?.banner as string);
    }
  }

  // find and delete course in one operation
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
