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
exports.SubCategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sub_category_model_1 = require("./sub-category.model");
const category_model_1 = require("../category/category.model");
const sub_category_constants_1 = require("./sub-category.constants");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const fileUploadHelper_1 = require("../../helpers/fileUploadHelper");
// create SubCategory
const createSubCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the category found of payload category_id
    const category = yield category_model_1.Category.findById(req.body.category_id);
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category not found of your category id");
    }
    if (req.file) {
        const file = req.file;
        const uploadedImage = yield fileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.icon = uploadedImage.secure_url;
        }
    }
    const result = (yield sub_category_model_1.SubCategory.create(req.body)).populate("category_id");
    return result;
});
// get all sub-categories
const getAllSubCategories = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: sub_category_constants_1.subCategorySearchableFields.map((field) => ({
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
    const result = yield sub_category_model_1.SubCategory.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate({
        path: "category_id",
        select: "-createdAt -updatedAt -__v",
    })
        .select("-createdAt -updatedAt -__v");
    const total = yield sub_category_model_1.SubCategory.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get SubCategory
const getSingleSubCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sub_category_model_1.SubCategory.findById(id)
        .populate({
        path: "category_id",
        select: "-createdAt -updatedAt -__v",
    })
        .select("-createdAt -updatedAt -__v");
    // if the SubCategory is not found, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "SubCategory not found!");
    }
    return result;
});
// update Sub-category
const updateSubCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // find sub-category of given id
    const subCategory = yield sub_category_model_1.SubCategory.findById(req.params.id);
    if (!subCategory) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Sub-category not found!");
    }
    // if image is given, upload new, and delete old one
    if (req.file) {
        const file = req.file;
        const uploadedImage = yield fileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.icon = uploadedImage.secure_url;
        }
        if (subCategory.icon) {
            // delete that sub-category icon from cloudinary
            fileUploadHelper_1.FileUploadHelper.deleteFromCloudinary(subCategory === null || subCategory === void 0 ? void 0 : subCategory.icon);
        }
    }
    // if the category_id is to be update, check if the category exists on that category_id
    if (req.body.category_id) {
        const category = yield category_model_1.Category.findById(req.body.category_id);
        if (!category) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category not found on given category_id!");
        }
    }
    // updating sub-category
    const result = yield sub_category_model_1.SubCategory.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
    });
    return result;
});
// delete sub category
const deleteSubCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subCategory = yield sub_category_model_1.SubCategory.findById(id);
    if (!subCategory) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Sub-category not found!");
    }
    else {
        if (subCategory.icon) {
            // delete that sub-category icon from cloudinary
            fileUploadHelper_1.FileUploadHelper.deleteFromCloudinary(subCategory === null || subCategory === void 0 ? void 0 : subCategory.icon);
        }
    }
    // find and delete sub-category in one operation
    const result = yield sub_category_model_1.SubCategory.findByIdAndDelete(id);
    return result;
});
exports.SubCategoryService = {
    createSubCategory,
    getAllSubCategories,
    getSingleSubCategory,
    updateSubCategory,
    deleteSubCategory,
};
