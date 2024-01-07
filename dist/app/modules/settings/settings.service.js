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
exports.SettingsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const settings_model_1 = require("./settings.model");
const settings_constants_1 = require("./settings.constants");
// add Settings
const addSettings = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.create(payload);
    return result;
});
// get all Settings
const getAllSettings = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: settings_constants_1.settingsSearchableFields.map((field) => ({
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
    const result = yield settings_model_1.Settings.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield settings_model_1.Settings.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single Settings
const getSingleSettings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Settings not found!");
    }
    return result;
});
// get shipping charge inside dhaka
const getShippingChargeInsideDhaka = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.findOne({
        key: "shipping_charge_inside_dhaka",
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.OK, "Shipping charge inside dhaka not found!");
    }
    return Number(result.value);
});
// get shipping charge outside dhaka
const getShippingChargeOutsideDhaka = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.findOne({
        key: "shipping_charge_outside_dhaka",
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.OK, "Shipping charge inside dhaka not found!");
    }
    return Number(result.value);
});
// update Settings
const updateSettings = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// delete Settings
const deleteSettings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.findByIdAndDelete(id);
    return result;
});
exports.SettingsService = {
    addSettings,
    getAllSettings,
    getShippingChargeInsideDhaka,
    getShippingChargeOutsideDhaka,
    getSingleSettings,
    updateSettings,
    deleteSettings,
};
