import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { SubCategory } from "../sub-category/sub-category.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { Course } from "../course/course.model";
import { Book } from "../book/book.model";
import { IOrderStatus, IOrderStatusFilters } from "./order-status.interface";
import { Order } from "../order/order.model";
import { OrderStatus } from "./order-status.model";
import { ShippingAddress } from "../shipping-address/shipping-address.model";
import { SortOrder } from "mongoose";

// create OrderStatus
const createOrderStatus = async (
  payload: IOrderStatus
): Promise<IOrderStatus> => {
  const { user_id, order_id, shipping_address_id } = payload;
  // to check if the user is present of the provided user_id
  const user = await Course.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // to check if the order is present of the provided order_id
  const order = await Order.findById(order_id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }

  // to check if the shipping address is present of the provided shipping address id
  const shippingAddress = await ShippingAddress.findById(shipping_address_id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Shipping address not found!");
  }

  const result = await OrderStatus.create(payload);
  return result;
};

// get all OrderStatuss
const getAllOrderStatuss = async (
  filters: IOrderStatusFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrderStatus[]>> => {
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

  const result = await OrderStatus.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("course_id");
  const total = await OrderStatus.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get OrderStatus
const getSingleOrderStatus = async (
  id: string
): Promise<IOrderStatus | null> => {
  const result = await OrderStatus.findById(id).populate("user_id book_id");

  // if the OrderStatus is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order status not found!");
  }

  return result;
};

// update OrderStatus
const updateOrderStatus = async (
  id: string,
  payload: Partial<IOrderStatus>
): Promise<IOrderStatus | null> => {
  // updating OrderStatus
  const result = await OrderStatus.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  // if the OrderStatus you want to update was not present, i.e. not updated, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Order status not found!"
    );
  }

  return result;
};

// delete user
const deleteOrderStatus = async (id: string) => {
  // find and delete OrderStatus in one operation
  const result = await OrderStatus.findOneAndDelete({ _id: id });

  // if the OrderStatus you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Order status not found!"
    );
  }

  return result;
};

export const OrderStatusService = {
  createOrderStatus,
  getAllOrderStatuss,
  getSingleOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
};
