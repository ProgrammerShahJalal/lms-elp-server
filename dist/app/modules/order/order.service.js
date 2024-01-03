"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const order_model_1 = require("./order.model");
const book_model_1 = require("../book/book.model");
const cart_model_1 = require("../cart/cart.model");
const shipping_address_model_1 = require("../shipping-address/shipping-address.model");
const order_details_model_1 = require("../order-details/order-details.model");
// create Order
const createOrder = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    // Fetch cart items
    const cartItems = yield cart_model_1.Cart.find({ user_id });
    // Initialize variables
    let totalPrice = 0;
    let discountPrice = 0;
    const orders = [];
    // Use map instead of forEach for asynchronous operations
    const orderPromises = cartItems.map((cartItem) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield book_model_1.Book.findById(cartItem === null || cartItem === void 0 ? void 0 : cartItem.book_id);
        const order = yield order_model_1.Order.create({
            user_id,
            book_id: book === null || book === void 0 ? void 0 : book._id,
            book_quantity: cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity,
            unit_price: book === null || book === void 0 ? void 0 : book.discount_price,
        });
        console.log(order);
        orders.push(order);
        totalPrice += Number(cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity) * Number(book === null || book === void 0 ? void 0 : book.discount_price);
        discountPrice +=
            (Number(book === null || book === void 0 ? void 0 : book.price) - Number(book === null || book === void 0 ? void 0 : book.discount_price)) *
                Number(cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity);
    }));
    // Wait for all orders to be created
    yield Promise.all(orderPromises);
    // Fetch shipping information
    const shipping = yield shipping_address_model_1.ShippingAddress.findOne({ user_id });
    const shippingAddress = JSON.stringify({
        division: shipping === null || shipping === void 0 ? void 0 : shipping.division,
        district: shipping === null || shipping === void 0 ? void 0 : shipping.district,
        upazilla: shipping === null || shipping === void 0 ? void 0 : shipping.upazilla,
        address: shipping === null || shipping === void 0 ? void 0 : shipping.address,
        phone: shipping === null || shipping === void 0 ? void 0 : shipping.contact_no,
        billing_name: shipping === null || shipping === void 0 ? void 0 : shipping.billing_name,
    });
    // Create order details
    result = yield order_details_model_1.OrderDetails.create({
        user_id,
        total_price: totalPrice,
        discounts: discountPrice,
        shipping_charge: 0,
        shipping_address_id: shipping === null || shipping === void 0 ? void 0 : shipping._id,
        orders: JSON.stringify(orders),
        trx_id: "dummy trx id",
        shipping_address: shippingAddress,
    });
    return result;
});
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
const getAllOrders = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield order_model_1.Order.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate({
        path: "user_id book_id",
        select: "name email contact_no title writer price discount_price format pdf_link",
    });
    const total = yield order_model_1.Order.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get Orders of an user
const getOrdersOfAnUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ user_id }).populate({
        path: "book_id",
        select: "name title writer format discount_price",
    });
    // if the Order is not found, throw error
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.OK, "Order not found!");
    }
    return result;
});
// get Order
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findById(id).populate("user_id book_id");
    // if the Order is not found, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.OK, "Order not found!");
    }
    return result;
});
// update Order
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // updating Order
    const result = yield order_model_1.Order.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    // if the Order you want to update was not present, i.e. not updated, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.OK, "Couldn't update. Order not found!");
    }
    return result;
});
// delete user
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find and delete Order in one operation
    const result = yield order_model_1.Order.findOneAndDelete({ _id: id });
    // if the Order you want to delete was not present, i.e. not deleted, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.OK, "Couldn't delete. Order not found!");
    }
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getOrdersOfAnUser,
    getSingleOrder,
    updateOrder,
    deleteOrder,
};
