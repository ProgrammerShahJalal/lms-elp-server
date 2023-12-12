import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { SubCategory } from "../sub-category/sub-category.model";
import { ICoursePlaylist } from "./course-playlist.interface";
import { CoursePlaylist } from "./course-playlist.model";
import { Course } from "../course/course.model";

// create CoursePlaylist
const createCoursePlaylist = async (
  payload: ICoursePlaylist
): Promise<ICoursePlaylist> => {
  // to check if the sub-category is present of the provided sub-category-id
  const { course_id } = payload;
  const course = await Course.findById(course_id);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  }

  const result = await CoursePlaylist.create(payload);
  return result;
};

// get all CoursePlaylists
const getAllCoursePlaylists = async (): Promise<ICoursePlaylist[]> => {
  const result = await CoursePlaylist.find({});

  // if there is no CoursePlaylist, throw error
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No course playlist found!");
  }

  return result;
};

// get CoursePlaylist
const getSingleCoursePlaylist = async (
  id: string
): Promise<ICoursePlaylist | null> => {
  const result = await CoursePlaylist.findById(id);

  // if the Course Playlist is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course playlist not found!");
  }

  return result;
};

// update Course Playlist
const updateCoursePlaylist = async (
  id: string,
  payload: Partial<ICoursePlaylist>
): Promise<ICoursePlaylist | null> => {
  // updating CoursePlaylist
  const result = await CoursePlaylist.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  // if the CoursePlaylist you want to update was not present, i.e. not updated, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. CoursePlaylist not found!"
    );
  }

  return result;
};

// delete user
const deleteCoursePlaylist = async (id: string) => {
  // find and delete CoursePlaylist in one operation
  const result = await CoursePlaylist.findOneAndDelete({ _id: id });

  // if the CoursePlaylist you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. CoursePlaylist not found!"
    );
  }

  return result;
};

export const CoursePlaylistService = {
  createCoursePlaylist,
  getAllCoursePlaylists,
  getSingleCoursePlaylist,
  updateCoursePlaylist,
  deleteCoursePlaylist,
};
