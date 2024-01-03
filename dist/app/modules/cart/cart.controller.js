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
exports.CartController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../constants/pagination");
const cart_service_1 = require("./cart.service");
const cart_constants_1 = require("./cart.constants");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cart_model_1 = require("./cart.model");
const addCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const payload = req.body;
    payload.user_id = user_id;
    const result = yield cart_service_1.CartService.addCart(payload, role);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart added successfully!",
        data: result,
    });
}));
const getAllCarts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, cart_constants_1.cartFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield cart_service_1.CartService.getAllCarts(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All Carts fetched successfully!",
        data: result,
    });
}));
const getSingleCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield cart_service_1.CartService.getSingleCart(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart fetched successfully!",
        data: result,
    });
}));
const getCartsOfAnUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user_id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
    const result = yield cart_service_1.CartService.getCartsOfAnUser(user_id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Carts fetched successfully!",
        data: result,
    });
}));
const updateCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield cart_service_1.CartService.updateCart(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart updated in successfully!",
        data: result,
    });
}));
const deleteCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const id = req.params.id;
    const user_id = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
    const role = (_e = req.user) === null || _e === void 0 ? void 0 : _e.role;
    const cart = yield cart_model_1.Cart.findById(id);
    let result;
    if (role == "admin" ||
        role == "super_admin" ||
        (cart === null || cart === void 0 ? void 0 : cart.user_id.toString()) == user_id) {
        result = yield cart_service_1.CartService.deleteCart(id);
    }
    else {
        throw new ApiError_1.default(http_status_1.default.OK, "Permission denied!");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart deleted in successfully!",
        data: result,
    });
}));
exports.CartController = {
    addCart,
    getAllCarts,
    getSingleCart,
    getCartsOfAnUser,
    updateCart,
    deleteCart,
};
