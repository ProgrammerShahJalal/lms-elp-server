import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { SubCategory } from "../sub-category/sub-category.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { OrderDetails } from "./order-details.model";
import { ShippingAddress } from "../shipping-address/shipping-address.model";
import { SortOrder } from "mongoose";
import { IOrderDetails, IOrderDetailsFilters } from "./order-details.interface";
import { User } from "../user/user.model";
import { isJSON } from "../../helpers/common";
import { IOrder } from "../order/order.interface";

// create OrderDetails
const createOrderDetails = async (
  payload: IOrderDetails
): Promise<IOrderDetails> => {
  const { user_id, shipping_address_id } = payload;
  // to check if the user is present of the provided user_id
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.OK, "User not found!");
  }

  // to check if the shipping address is present of the provided shipping_address_id
  const shipping_address = await ShippingAddress.findById(shipping_address_id);
  if (!shipping_address) {
    throw new ApiError(httpStatus.OK, "Shipping address not found!");
  }

  if (!isJSON(payload.orders)) {
    throw new ApiError(httpStatus.OK, "Invalid orders format!");
  }

  const orders = JSON.parse(payload.orders);
  payload.total_price = orders.reduce(
    (sum: number, order: IOrder) =>
      sum + order.book_quantity * order.unit_price,
    0
  );
  payload.shipping_address_id = shipping_address._id;
  payload.shipping_address = JSON.stringify(shipping_address);

  const result = await OrderDetails.create(payload);
  return result;
};

// get all OrderDetailss
const getAllOrderDetails = async (
  filters: IOrderDetailsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrderDetails[]>> => {
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

  const result = await OrderDetails.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("user_id ");
  const total = await OrderDetails.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get my Order Details
const getMyOrderDetails = async (
  user_id: string
): Promise<IOrderDetails[] | null> => {
  const result = await OrderDetails.find({ user_id }).populate("user_id");

  // if the OrderDetails is not found, throw error
  if (!result.length) {
    throw new ApiError(httpStatus.OK, "Order details not found!");
  }

  return result;
};

// get OrderDetails
const getSingleOrderDetails = async (
  id: string
): Promise<IOrderDetails | null> => {
  const result = await OrderDetails.findById(id).populate("user_id book_id");

  // if the OrderDetails is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order status not found!");
  }

  return result;
};

// update OrderDetails
const updateOrderDetails = async (
  id: string,
  payload: Partial<IOrderDetails>
): Promise<IOrderDetails | null> => {
  // updating OrderDetails
  const result = await OrderDetails.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  // if the OrderDetails you want to update was not present, i.e. not updated, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't update. Order status not found!"
    );
  }

  return result;
};

// delete user
const deleteOrderDetails = async (id: string) => {
  // find and delete OrderDetails in one operation
  const result = await OrderDetails.findOneAndDelete({ _id: id });

  // if the OrderDetails you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Couldn't delete. Order status not found!"
    );
  }

  return result;
};

export const OrderDetailsService = {
  createOrderDetails,
  getAllOrderDetails,
  getMyOrderDetails,
  getSingleOrderDetails,
  updateOrderDetails,
  deleteOrderDetails,
};
