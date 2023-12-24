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
exports.OrderStatusService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const order_model_1 = require("../order/order.model");
const order_status_model_1 = require("./order-status.model");
const shipping_address_model_1 = require("../shipping-address/shipping-address.model");
const user_model_1 = require("../user/user.model");
// create OrderStatus
const createOrderStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, order_details_id, shipping_address_id } = payload;
    // to check if the user is present of the provided user_id
    const user = yield user_model_1.User.findById(user_id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // to check if the order details is present of the provided order_details_id
    const order_details = yield order_model_1.Order.findById(order_details_id);
    if (!order_details) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order details found!");
    }
    // to check if the shipping address is present of the provided shipping address id
    const shippingAddress = yield shipping_address_model_1.ShippingAddress.findById(shipping_address_id);
    if (!shippingAddress) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Shipping address not found!");
    }
    const result = yield order_status_model_1.OrderStatus.create(payload);
    return result;
});
// get all OrderStatuss
const getAllOrderStatuss = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield order_status_model_1.OrderStatus.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("course_id");
    const total = yield order_status_model_1.OrderStatus.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get OrderStatus
const getSingleOrderStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_status_model_1.OrderStatus.findById(id).populate("user_id book_id");
    // if the OrderStatus is not found, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order status not found!");
    }
    return result;
});
// update OrderStatus
const updateOrderStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // updating OrderStatus
    const result = yield order_status_model_1.OrderStatus.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    // if the OrderStatus you want to update was not present, i.e. not updated, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't update. Order status not found!");
    }
    return result;
});
// delete user
const deleteOrderStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find and delete OrderStatus in one operation
    const result = yield order_status_model_1.OrderStatus.findOneAndDelete({ _id: id });
    // if the OrderStatus you want to delete was not present, i.e. not deleted, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't delete. Order status not found!");
    }
    return result;
});
exports.OrderStatusService = {
    createOrderStatus,
    getAllOrderStatuss,
    getSingleOrderStatus,
    updateOrderStatus,
    deleteOrderStatus,
};
