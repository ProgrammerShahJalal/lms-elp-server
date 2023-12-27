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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_utills_1 = require("./user.utills");
const user_constants_1 = require("./user.constants");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
// registering user/student
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    userData.role = "student" /* ENUM_USER_ROLE.STUDENT */;
    const createdUser = yield user_utills_1.UserUtills.createUser(userData);
    const { accessToken, refreshToken } = yield user_utills_1.UserUtills.createTokenRefreshTokenForUser(createdUser);
    return { createdUser, accessToken, refreshToken };
});
// create admin
const createAdmin = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    userData.role = "admin" /* ENUM_USER_ROLE.ADMIN */;
    const createdUser = yield user_utills_1.UserUtills.createUser(userData);
    const { accessToken, refreshToken } = yield user_utills_1.UserUtills.createTokenRefreshTokenForUser(createdUser);
    return { createdUser, accessToken, refreshToken };
});
// creating super admin
const createSuperAdmin = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    userData.role = "super_admin" /* ENUM_USER_ROLE.SUPER_ADMIN */;
    const createdUser = yield user_utills_1.UserUtills.createUser(userData);
    const { accessToken, refreshToken } = yield user_utills_1.UserUtills.createTokenRefreshTokenForUser(createdUser);
    return { createdUser, accessToken, refreshToken };
});
// login user
const login = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email_or_contact, password } = loginInfo;
    const requestedUser = yield user_model_1.User.findOne({
        $or: [
            { contact_no: { $exists: true, $ne: null, $eq: email_or_contact } },
            { email: { $exists: true, $ne: null, $eq: email_or_contact } },
        ],
    });
    if (!requestedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // compare password
    const isPasswordMatched = bcrypt_1.default.compareSync(password, requestedUser === null || requestedUser === void 0 ? void 0 : requestedUser.password);
    // if password doesn't match, throw error
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid credentials!");
    }
    const { accessToken, refreshToken } = yield user_utills_1.UserUtills.createTokenRefreshTokenForUser(requestedUser);
    return { isPasswordMatched, accessToken, refreshToken };
});
// get all users
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constants_1.userSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
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
    const result = yield user_model_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No user found!");
    }
    return result;
});
// get single user
const getSingleUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(user_id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const _a = result.toObject(), { password } = _a, otherData = __rest(_a, ["password"]);
    return otherData;
});
// update user
const updateUser = (user_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(user_id, payload, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const _b = result.toObject(), { password } = _b, otherData = __rest(_b, ["password"]);
    return otherData;
});
// delete user
const deleteUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(user_id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    return result;
});
exports.UserService = {
    registerUser,
    createSuperAdmin,
    createAdmin,
    login,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
