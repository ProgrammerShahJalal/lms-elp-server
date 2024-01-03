import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import mongoose, { SortOrder } from "mongoose";
import { IOrder, IOrderFilters } from "./order.interface";
import { Order } from "./order.model";
import { Book } from "../book/book.model";
import { Cart } from "../cart/cart.model";
import { ShippingAddress } from "../shipping-address/shipping-address.model";
import { OrderDetails } from "../order-details/order-details.model";
import { IOrderDetails } from "../order-details/order-details.interface";

// create Order
const createOrder = async (user_id: string): Promise<IOrderDetails> => {
  let result;

  // Fetch cart items
  const cartItems = await Cart.find({ user_id });

  // Initialize variables
  let totalPrice: number = 0;
  let discountPrice: number = 0;
  const orders: IOrder[] = [];

  // Use map instead of forEach for asynchronous operations
  const orderPromises = cartItems.map(async (cartItem) => {
    const book = await Book.findById(cartItem?.book_id);
    const order = await Order.create({
      user_id,
      book_id: book?._id,
      book_quantity: cartItem?.quantity,
      unit_price: book?.discount_price,
    });
    console.log(order);

    orders.push(order);
    totalPrice += Number(cartItem?.quantity) * Number(book?.discount_price);
    discountPrice +=
      (Number(book?.price) - Number(book?.discount_price)) *
      Number(cartItem?.quantity);
  });

  // Wait for all orders to be created
  await Promise.all(orderPromises);

  // Fetch shipping information
  const shipping = await ShippingAddress.findOne({ user_id });
  const shippingAddress = JSON.stringify({
    division: shipping?.division,
    district: shipping?.district,
    upazilla: shipping?.upazilla,
    address: shipping?.address,
    phone: shipping?.contact_no,
    billing_name: shipping?.billing_name,
  });

  // Create order details
  result = await OrderDetails.create({
    user_id,
    total_price: totalPrice,
    discounts: discountPrice,
    shipping_charge: 0,
    shipping_address_id: shipping?._id,
    orders: JSON.stringify(orders),
    trx_id: "dummy trx id",
    shipping_address: shippingAddress,
  });

  return result;
};

// const createOrder = async (user_id: string): Promise<IOrderDetails> => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   let result;
//   try {
//     const cartItems = await Cart.find({ user_id }).session(session);

//     let totalPrice: number = 0;
//     let discountPrice: number = 0;
//     const orders: IOrder[] = [];
//     cartItems.forEach(async (cartItem) => {
//       const book = await Book.findById(cartItem.book_id).session(session);
//       const order = await Order.create(
//         {
//           user_id,
//           book_id: book?._id,
//           book_quantity: cartItem?.quantity,
//           unit_price: book?.discount_price,
//         },
//         { session }
//       );
//       orders.push(order);
//       totalPrice += Number(cartItem?.quantity) * Number(book?.discount_price);
//       discountPrice +=
//         (Number(book?.price) - Number(book?.discount_price)) *
//         Number(cartItem?.quantity);
//     });

//     const shipping = await ShippingAddress.findOne({ user_id }).session(
//       session
//     );
//     const shippingAddress = JSON.stringify({
//       division: shipping?.division,
//       district: shipping?.district,
//       upazilla: shipping?.upazilla,
//       address: shipping?.address,
//       phone: shipping?.contact_no,
//       billing_name: shipping?.billing_name,
//     });

//     result = await OrderDetails.create(
//       {
//         user_id,
//         total_price: totalPrice,
//         discounts: discountPrice,
//         shipping_charge: 0,
//         shipping_address_id: shipping?._id,
//         orders: JSON.stringify(orders),
//         trx_id: "dummy trx id",
//         shipping_address: shippingAddress,
//       },
//       { session }
//     );

//     // If everything is successful, commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     return result;
//   } catch (error) {
//     // If any error occurs, abort the transaction
//     await session.abortTransaction();
//     session.endSession();
//     throw new ApiError(httpStatus.OK, "Error creating order!");
//   }
// };

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
    .populate({
      path: "user_id book_id",
      select:
        "name email contact_no title writer price discount_price format pdf_link",
    });
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

// get Orders of an user
const getOrdersOfAnUser = async (user_id: string): Promise<IOrder[] | null> => {
  const result = await Order.find({ user_id }).populate({
    path: "book_id",
    select: "name title writer format discount_price",
  });

  // if the Order is not found, throw error
  if (!result.length) {
    throw new ApiError(httpStatus.OK, "Order not found!");
  }

  return result;
};

// get Order
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id).populate("user_id book_id");

  // if the Order is not found, throw error
  if (!result) {
    throw new ApiError(httpStatus.OK, "Order not found!");
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
    throw new ApiError(httpStatus.OK, "Couldn't update. Order not found!");
  }

  return result;
};

// delete user
const deleteOrder = async (id: string) => {
  // find and delete Order in one operation
  const result = await Order.findOneAndDelete({ _id: id });

  // if the Order you want to delete was not present, i.e. not deleted, throw error
  if (!result) {
    throw new ApiError(httpStatus.OK, "Couldn't delete. Order not found!");
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrdersOfAnUser,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
