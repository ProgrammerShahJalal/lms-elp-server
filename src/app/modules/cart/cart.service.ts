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
import { User } from "../user/user.model";

// add Cart
const addCart = async (payload: ICart): Promise<ICart | null> => {
  const { user_id, book_id } = payload;

  // if the provided user_id have the user or not in db
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.OK, "User not found!");
  }
  // if the provided book_id have the book or not in db
  const book = await Book.findById(book_id);
  if (!book) {
    throw new ApiError(httpStatus.OK, "Book not found!");
  }

  const cartExisting = await Cart.findOne({
    user_id,
    book_id,
  });

  let result;

  if (!cartExisting) {
    if (Number(payload?.quantity) <= 0) {
      throw new ApiError(
        httpStatus.OK,
        "Quantity can not be negative or zero!"
      );
    }
    // Create the cart
    const createdCart = await Cart.create(payload);

    // Query the created cart to populate the user and book information
    result = await Cart.findById(createdCart._id).populate(
      "book_id",
      "name writer price"
    );
    // .populate("user_id", "name email contact_no")
  } else {
    if (Number(cartExisting?.quantity) + Number(payload?.quantity) < 0) {
      return cartExisting;
    }
    await Cart.updateOne(
      {
        user_id,
        book_id,
      },
      { $inc: { quantity: payload.quantity || 1 } },
      { new: true }
    );

    result = await Cart.findById(cartExisting._id)
      .populate("user_id", "name email contact_no")
      .populate("book_id", "name writer price");
  }

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
  const result = await Cart.findById(id).populate("book_id");

  if (!result) {
    throw new ApiError(httpStatus.OK, "Cart not found!");
  }

  return result;
};

// get Carts of an User
const getCartsOfAnUser = async (user_id: string): Promise<ICart[] | null> => {
  const result = await Cart.find({ user_id }).populate("book_id");

  if (!result) {
    throw new ApiError(httpStatus.OK, "Cart not found!");
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
  addCart,
  getAllCarts,
  getSingleCart,
  getCartsOfAnUser,
  updateCart,
  deleteCart,
};
