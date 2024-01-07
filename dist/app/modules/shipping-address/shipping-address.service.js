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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddressService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const shipping_address_model_1 = require("./shipping-address.model");
// creating shipping address
const createShippingAddress = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = payload;
    const user = yield user_model_1.User.findById(user_id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const result = yield shipping_address_model_1.ShippingAddress.create(payload);
    return result;
});
// get all shipping address
const getAllShippingAddresss = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shipping_address_model_1.ShippingAddress.find({});
    return result;
});
// get single shipping address
const getSingleShippingAddress = (id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const shipping_address = yield shipping_address_model_1.ShippingAddress.findById(id);
    if ((shipping_address === null || shipping_address === void 0 ? void 0 : shipping_address.user_id.toString()) !== user_id.toString()) {
        throw new ApiError_1.default(http_status_1.default.OK, "Unauthorized!");
    }
    return shipping_address;
});
// get my shipping address
const getMyShippingAddress = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const shipping_address = yield shipping_address_model_1.ShippingAddress.findOne({
        user_id,
    });
    if (!shipping_address) {
        throw new ApiError_1.default(http_status_1.default.OK, "No shipping address found!");
    }
    return shipping_address;
});
// update shipping address
const updateShippingAddress = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shipping_address_model_1.ShippingAddress.findOneAndUpdate({ user_id: payload === null || payload === void 0 ? void 0 : payload.user_id }, payload, {
        upsert: true,
        new: true,
    });
    return result;
});
// delete shipping address
const deleteShippingAddress = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shipping_address_model_1.ShippingAddress.findByIdAndDelete(id);
    return result;
});
exports.ShippingAddressService = {
    createShippingAddress,
    getAllShippingAddresss,
    getMyShippingAddress,
    getSingleShippingAddress,
    updateShippingAddress,
    deleteShippingAddress,
};
