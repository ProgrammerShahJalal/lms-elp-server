import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Course } from "../course/course.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";
import { ISubject, ISubjectFilters } from "./subject.interface";
import { Subject } from "./subject.model";
import { subjectSearchableFields } from "./subject.constants";

// add Subject
const addSubject = async (payload: ISubject): Promise<ISubject> => {
  const result = await Subject.create(payload);

  return result;
};

// get all Subject
const getAllSubject = async (
  filters: ISubjectFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISubject[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: subjectSearchableFields.map((field) => ({
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

  const result = await Subject.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Subject.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single Subject
const getSingleSubject = async (id: string): Promise<ISubject | null> => {
  const result = await Subject.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.OK, "Subject not found!");
  }

  return result;
};

// update Subject
const updateSubject = async (
  id: string,
  payload: Partial<ISubject>
): Promise<ISubject | null> => {
  const result = await Subject.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete Subject
const deleteSubject = async (id: string) => {
  const result = await Subject.findByIdAndDelete(id);
  return result;
};

export const SubjectService = {
  addSubject,
  getAllSubject,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
