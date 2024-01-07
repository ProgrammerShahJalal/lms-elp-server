import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Course } from "../course/course.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";
import { ISettings, ISettingsFilters } from "./settings.interface";
import { Settings } from "./settings.model";
import { settingsSearchableFields } from "./settings.constants";

// add Settings
const addSettings = async (payload: ISettings): Promise<ISettings> => {
  const result = await Settings.create(payload);

  return result;
};

// get all Settings
const getAllSettings = async (
  filters: ISettingsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISettings[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: settingsSearchableFields.map((field) => ({
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

  const result = await Settings.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Settings.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single Settings
const getSingleSettings = async (id: string): Promise<ISettings | null> => {
  const result = await Settings.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Settings not found!");
  }

  return result;
};

// get shipping charge inside dhaka
const getShippingChargeInsideDhaka = async (): Promise<number> => {
  const result = await Settings.findOne({
    key: "shipping_charge_inside_dhaka",
  });

  if (!result) {
    throw new ApiError(
      httpStatus.OK,
      "Shipping charge inside dhaka not found!"
    );
  }

  return Number(result.value);
};

// get shipping charge outside dhaka
const getShippingChargeOutsideDhaka = async (): Promise<number> => {
  const result = await Settings.findOne({
    key: "shipping_charge_outside_dhaka",
  });

  if (!result) {
    throw new ApiError(
      httpStatus.OK,
      "Shipping charge inside dhaka not found!"
    );
  }

  return Number(result.value);
};

// update Settings
const updateSettings = async (
  id: string,
  payload: Partial<ISettings>
): Promise<ISettings | null> => {
  const result = await Settings.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete Settings
const deleteSettings = async (id: string) => {
  const result = await Settings.findByIdAndDelete(id);
  return result;
};

export const SettingsService = {
  addSettings,
  getAllSettings,
  getShippingChargeInsideDhaka,
  getShippingChargeOutsideDhaka,
  getSingleSettings,
  updateSettings,
  deleteSettings,
};
