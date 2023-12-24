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
exports.CategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const category_model_1 = require("./category.model");
const fileUploadHelper_1 = require("../../helpers/fileUploadHelper");
// create category
const createCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const file = req.file;
        const uploadedImage = yield fileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.icon = uploadedImage.secure_url;
        }
    }
    const result = yield category_model_1.Category.create(req.body);
    return result;
});
// get all categories
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.find({});
    // if there is no category, throw error
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No category found!");
    }
    return result;
});
// get category
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findById(id);
    // if the category is not found, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category not found!");
    }
    return result;
});
// update category
const updateCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // find category of given id
    const category = yield category_model_1.Category.findById(req.params.id);
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category not found!");
    }
    // if image is given, upload new, and delete old one
    if (req.file) {
        const file = req.file;
        const uploadedImage = yield fileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.icon = uploadedImage.secure_url;
        }
        if (category.icon) {
            // delete that category icon from cloudinary
            fileUploadHelper_1.FileUploadHelper.deleteFromCloudinary(category === null || category === void 0 ? void 0 : category.icon);
        }
    }
    // updating category
    const result = yield category_model_1.Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
    });
    return result;
});
// delete category
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.Category.findById(id);
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category not found!");
    }
    else {
        if (category.icon) {
            // delete that category icon from cloudinary
            fileUploadHelper_1.FileUploadHelper.deleteFromCloudinary(category === null || category === void 0 ? void 0 : category.icon);
        }
    }
    // find and delete category in one operation
    const result = yield category_model_1.Category.findByIdAndDelete(id);
    return result;
});
exports.CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
