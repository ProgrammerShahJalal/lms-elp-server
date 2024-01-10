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
import { Settings } from "../settings/settings.model";
import { isJSON } from "../../helpers/common";
import { OrderStatus } from "../order-status/order-status.model";

// create Order
const createOrder = async (
  user_id: string,
  payload: { trx_id: string; shipping_address: string }
): Promise<IOrderDetails> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch cart items
    const cartItems = await Cart.find({ user_id }).session(session);
    if (!cartItems?.length) {
      throw new ApiError(httpStatus.OK, "No item in the cart!");
    }

    // Initialize variables
    let totalPrice: number = 0;
    let discountPrice: number = 0;
    let needShippingCharge: boolean = false;
    let shippingCharge;
    const orders: Partial<IOrder>[] = [];

    // Use map instead of forEach for asynchronous operations
    const orderPromises = cartItems.map(async (cartItem) => {
      const book = await Book.findById(cartItem?.book_id).session(session);
      const order = await Order.create(
        [
          {
            user_id,
            book_id: book?._id,
            book_quantity: cartItem?.quantity,
            unit_price: book?.discount_price,
          },
        ],
        {
          session,
        }
      );

      const orderToPush = {
        book_id: order[0]?.book_id,
        book_quantity: order[0]?.book_quantity,
        unit_price: order[0]?.unit_price,
      };
      orders.push(orderToPush);

      if (book?.format === "hard copy") {
        needShippingCharge = true;
      }

      totalPrice += Number(cartItem?.quantity) * Number(book?.discount_price);
      discountPrice +=
        (Number(book?.price) - Number(book?.discount_price)) *
        Number(cartItem?.quantity);
    });

    // Wait for all orders to be created
    await Promise.all(orderPromises);

    // if shipping address is given in payload, but in invalid format
    if (payload.shipping_address && !isJSON(payload.shipping_address)) {
      throw new ApiError(httpStatus.OK, "Invalid shipping address format!");
    }

    // Fetch shipping information
    const shipping = await ShippingAddress.findOne({ user_id }).session(
      session
    );
    if (needShippingCharge && !shipping) {
      throw new ApiError(httpStatus.OK, "No shipping address found!");
    }

    // fetch and calculate shipping charge
    if (needShippingCharge) {
      if (shipping?.outside_dhaka) {
        shippingCharge = await Settings.findOne({
          key: "shipping_charge_inside_dhaka",
        }).session(session);
      } else {
        shippingCharge = await Settings.findOne({
          key: "shipping_charge_outside_dhaka",
        }).session(session);
      }
    }
    shippingCharge = needShippingCharge ? Number(shippingCharge?.value) : 0;

    const shippingAddress = needShippingCharge
      ? payload.shipping_address || JSON.stringify(shipping)
      : "";

    // Create order details
    const result = await OrderDetails.create(
      [
        {
          user_id,
          total_price: totalPrice + shippingCharge,
          discounts: discountPrice,
          shipping_charge: shippingCharge,
          shipping_address_id: shipping?._id,
          orders: JSON.stringify(orders),
          trx_id: payload.trx_id,
          shipping_address: shippingAddress,
        },
      ],
      {
        session,
      }
    );
    // on successfull order, clear carts of that user
    await Cart.deleteMany(
      {
        user_id,
      },
      {
        session,
      }
    );

    // create order status
    if (needShippingCharge) {
      await OrderStatus.create(
        [
          {
            user_id,
            order_details_id: result[0]?._id,
            status: "Pending Approval",
            shipping_address_id: shipping?.id,
          },
        ],
        {
          session,
        }
      );
    }

    await session.commitTransaction();
    return result[0];
  } catch (error: any) {
    await session.abortTransaction();
    throw new ApiError(
      httpStatus.OK,
      `Order creation failed: ${error.message}`
    );
  } finally {
    session.endSession();
  }
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
