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
exports.ShippingAddressController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const shipping_address_service_1 = require("./shipping-address.service");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = req === null || req === void 0 ? void 0 : req.user;
    const payload = req.body;
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) !== "super_admin" &&
        (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) !== "admin" &&
        payload.user_id !== (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.userId)) {
        throw new ApiError_1.default(http_status_1.default.OK, "Unauthorized! Login to your account.");
    }
    const result = yield shipping_address_service_1.ShippingAddressService.createShippingAddress(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Shipping address added successfully!",
        data: result,
    });
}));
const getAllShippingAddresss = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shipping_address_service_1.ShippingAddressService.getAllShippingAddresss();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All Shipping addresses fetched successfully!",
        data: result,
    });
}));
const getSingleShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const user_id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield shipping_address_service_1.ShippingAddressService.getSingleShippingAddress(id, user_id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Shipping address fetched successfully!",
        data: result,
    });
}));
const getMyShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user_id = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
    const result = yield shipping_address_service_1.ShippingAddressService.getMyShippingAddress(user_id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Shipping address fetched successfully!",
        data: result,
    });
}));
const updateShippingAddress = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = req === null || req === void 0 ? void 0 : req.user;
    const payload = req.body;
    if (payload.user_id) {
        if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) !== "super_admin" &&
            (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) !== "admin" &&
            (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.userId) !== payload.user_id) {
            throw new ApiError_1.default(http_status_1.default.OK, "Unauthorized! Login to your account.");
        }
    }
    const result = yield shipping_address_service_1.ShippingAddressService.updateShippingAddress(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Shipping address updated in successfully!",
        data: result,
    });
}));
const deleteShippingAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield shipping_address_service_1.ShippingAddressService.deleteShippingAddress(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Shipping address deleted in successfully!",
        data: result,
    });
}));
exports.ShippingAddressController = {
    createShippingAddress,
    getAllShippingAddresss,
    getMyShippingAddress,
    getSingleShippingAddress,
    updateShippingAddress,
    deleteShippingAddress,
};
