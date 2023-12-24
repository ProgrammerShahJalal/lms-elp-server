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
exports.CartService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cart_model_1 = require("./cart.model");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const book_model_1 = require("../book/book.model");
const user_model_1 = require("../user/user.model");
// add Cart
const addCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, book_id } = payload;
    // if the provided user_id have the user or not in db
    const user = yield user_model_1.User.findById(user_id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // if the provided book_id have the book or not in db
    const book = yield book_model_1.Book.findById(book_id);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    const cartExisting = yield cart_model_1.Cart.findOne({
        user_id,
        book_id,
    });
    let result;
    if (!cartExisting) {
        // Create the cart
        const createdCart = yield cart_model_1.Cart.create(payload);
        // Query the created cart to populate the user and book information
        result = yield cart_model_1.Cart.findById(createdCart._id)
            .populate("user_id", "name email contact_no")
            .populate("book_id", "name writer price");
    }
    else {
        if (Number(cartExisting === null || cartExisting === void 0 ? void 0 : cartExisting.quantity) + Number(payload === null || payload === void 0 ? void 0 : payload.quantity) < 0) {
            return cartExisting;
        }
        yield cart_model_1.Cart.updateOne({
            user_id,
            book_id,
        }, { $inc: { quantity: payload.quantity || 1 } }, { new: true });
        result = yield cart_model_1.Cart.findById(cartExisting._id)
            .populate("user_id", "name email contact_no")
            .populate("book_id", "name writer price");
    }
    return result;
});
// get all Carts
const getAllCarts = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const filtersData = __rest(filters, []);
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
    const result = yield cart_model_1.Cart.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("user_id book_id");
    const total = yield cart_model_1.Cart.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single Cart
const getSingleCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findById(id).populate("course_id");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cart not found!");
    }
    return result;
});
// update Cart
const updateCart = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// delete Cart
const deleteCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findByIdAndDelete(id);
    return result;
});
exports.CartService = {
    addCart,
    getAllCarts,
    getSingleCart,
    updateCart,
    deleteCart,
};
