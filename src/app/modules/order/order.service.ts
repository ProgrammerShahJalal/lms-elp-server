import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { SubCategory } from "../sub-category/sub-category.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { IOrder, IOrderFilters } from "./order.interface";
import { Order } from "./order.model";
import { Book } from "../book/book.model";
import { User } from "../user/user.model";

// create Order
const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const { user_id, book_id } = payload;
  // to check if the user is present of the provided user_id
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // to check if the book is present of the provided book_id
  const book = await Book.findById(book_id);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }

  const result = await Order.create(payload);
  return result;
};

// get all Orders
const getAllOrders = async (
  filters: IOrderFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrder[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

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

  const result = await Order.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("course_id");
  const total = await Order.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get Order
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id).populate("user_id book_id");

  // if the Order is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found!");
  }

  return result;
};

// update Order
const updateOrder = async (
  id: string,
  payload: Partial<IOrder>
): Promise<IOrder | null> => {
  // updating Order
  const result = await Order.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  // if the Order you want to update was not present, i.e. not updated, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Order not found!"
    );
  }

  return result;
};

// delete user
const deleteOrder = async (id: string) => {
  // find and delete Order in one operation
  const result = await Order.findOneAndDelete({ _id: id });

  // if the Order you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Order not found!"
    );
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
