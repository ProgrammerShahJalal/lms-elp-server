import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Course } from "../course/course.model";
import { Cart } from "./cart.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { SortOrder } from "mongoose";
import { ICart, ICartFilters } from "./cart.interface";
import { Book } from "../book/book.model";

// create Cart
const createCart = async (payload: ICart): Promise<ICart> => {
  // if the provided user_id have the user or not in db
  const { user_id, book_id } = payload;

  const user = await Course.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  // if the provided book_id have the book or not in db
  const book = await Book.findById(book_id);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }

  console.log(book);

  const result = await Cart.create(payload);

  return result;
};

// get all Carts
const getAllCarts = async (
  filters: ICartFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICart[]>> => {
  const { ...filtersData } = filters;

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

  const result = await Cart.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("user_id book_id");
  const total = await Cart.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
// get single Cart
const getSingleCart = async (id: string): Promise<ICart | null> => {
  const result = await Cart.findById(id).populate("course_id");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cart not found!");
  }

  return result;
};

// update Cart
const updateCart = async (
  id: string,
  payload: Partial<ICart>
): Promise<ICart | null> => {
  const result = await Cart.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete Cart
const deleteCart = async (id: string) => {
  const result = await Cart.findByIdAndDelete(id);
  return result;
};

export const CartService = {
  createCart,
  getAllCarts,
  getSingleCart,
  updateCart,
  deleteCart,
};
