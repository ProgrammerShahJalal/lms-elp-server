import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";
import { SubCategory } from "../sub-category/sub-category.model";

// create Course
const createCourse = async (payload: ICourse): Promise<ICourse> => {
  // to check if the sub-category is present of the provided sub-category-id
  const { sub_category_id } = payload;
  const subCategory = await SubCategory.findById(sub_category_id);
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, "Sub category not found!");
  }

  const result = await Course.create(payload);
  return result;
};

// get all courses
const getAllCourses = async (): Promise<ICourse[]> => {
  const result = await Course.find({});

  // if there is no Course, throw error
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Course found!");
  }

  return result;
};

// get Course
const getSingleCourse = async (id: string): Promise<ICourse | null> => {
  const result = await Course.findById(id);

  // if the Course is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  }

  return result;
};

// update Course
const updateCourse = async (
  id: string,
  payload: Partial<ICourse>
): Promise<ICourse | null> => {
  // updating Course
  const result = await Course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  // if the Course you want to update was not present, i.e. not updated, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Course not found!"
    );
  }

  return result;
};

// delete user
const deleteCourse = async (id: string) => {
  // find and delete Course in one operation
  const result = await Course.findOneAndDelete({ _id: id });

  // if the Course you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Course not found!"
    );
  }

  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
