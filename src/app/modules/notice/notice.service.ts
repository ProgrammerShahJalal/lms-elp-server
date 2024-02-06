import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { noticeSearchableFields } from "./notice.constants";
import { INotice, INoticeFilters } from "./notice.interface";
import { Notice } from "./notice.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

// create CoursePlaylist
const createNotice = async (payload: INotice): Promise<INotice> => {
  const result = await Notice.create(payload);
  return result;
};

// get all CoursePlaylists
const getAllNotices = async (
  filters: INoticeFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<INotice[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: noticeSearchableFields.map((field) => ({
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

  let result = await Notice.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Notice.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get Course Playlist
const getSingleNotice = async (id: string): Promise<INotice | null> => {
  const result = await Notice.findById(id);

  return result;
};

// update Course Playlist
const updateNotice = async (
  id: string,
  payload: Partial<INotice>
): Promise<INotice | null> => {
  // updating CoursePlaylist
  const result = await Notice.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  // if the CoursePlaylist you want to update was not present, i.e. not updated, throw error
  if (!result) {
    throw new ApiError(httpStatus.OK, "Couldn't update. Notice not found!");
  }

  return result;
};

// delete user
const deleteNotice = async (id: string) => {
  // find and delete CoursePlaylist in one operation
  const result = await Notice.findOneAndDelete({ _id: id });

  // if the CoursePlaylist you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(httpStatus.OK, "Couldn't delete. Notice not found!");
  }

  return result;
};

export const NoticeService = {
  createNotice,
  getAllNotices,
  getSingleNotice,
  updateNotice,
  deleteNotice,
};
