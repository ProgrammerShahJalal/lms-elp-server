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
exports.OrderDetailsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const order_details_model_1 = require("./order-details.model");
const shipping_address_model_1 = require("../shipping-address/shipping-address.model");
const user_model_1 = require("../user/user.model");
const common_1 = require("../../helpers/common");
// create OrderDetails
const createOrderDetails = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, shipping_address_id } = payload;
    // to check if the user is present of the provided user_id
    const user = yield user_model_1.User.findById(user_id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.OK, "User not found!");
    }
    // to check if the shipping address is present of the provided shipping_address_id
    const shipping_address = yield shipping_address_model_1.ShippingAddress.findById(shipping_address_id);
    if (!shipping_address) {
        throw new ApiError_1.default(http_status_1.default.OK, "Shipping address not found!");
    }
    if (!(0, common_1.isJSON)(payload.orders)) {
        throw new ApiError_1.default(http_status_1.default.OK, "Invalid orders format!");
    }
    const orders = JSON.parse(payload.orders);
    payload.total_price = orders.reduce((sum, order) => sum + order.book_quantity * order.unit_price, 0);
    payload.shipping_address_id = shipping_address._id;
    payload.shipping_address = JSON.stringify(shipping_address);
    const result = yield order_details_model_1.OrderDetails.create(payload);
    return result;
});
// get all OrderDetailss
const getAllOrderDetails = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield order_details_model_1.OrderDetails.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield order_details_model_1.OrderDetails.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get my Order Details
const getMyOrderDetails = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_details_model_1.OrderDetails.find({ user_id });
    // if the OrderDetails is not found, throw error
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.OK, "Order details not found!");
    }
    return result;
});
// get OrderDetails
const getSingleOrderDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_details_model_1.OrderDetails.findById(id);
    // if the OrderDetails is not found, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order details not found!");
    }
    return result;
});
// update OrderDetails
const updateOrderDetails = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // updating OrderDetails
    const result = yield order_details_model_1.OrderDetails.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    // if the OrderDetails you want to update was not present, i.e. not updated, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't update. Order status not found!");
    }
    return result;
});
// delete user
const deleteOrderDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find and delete OrderDetails in one operation
    const result = yield order_details_model_1.OrderDetails.findOneAndDelete({ _id: id });
    // if the OrderDetails you want to delete was not present, i.e. not deleted, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't delete. Order status not found!");
    }
    return result;
});
exports.OrderDetailsService = {
    createOrderDetails,
    getAllOrderDetails,
    getMyOrderDetails,
    getSingleOrderDetails,
    updateOrderDetails,
    deleteOrderDetails,
};
