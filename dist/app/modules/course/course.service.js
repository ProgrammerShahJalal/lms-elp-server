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
exports.CourseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const course_model_1 = require("./course.model");
const sub_category_model_1 = require("../sub-category/sub-category.model");
const course_constants_1 = require("./course.constants");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const fileUploadHelper_1 = require("../../helpers/fileUploadHelper");
// create Course
const createCourse = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // to check if the sub-category is present of the provided sub-category-id
    const { sub_category_id } = req.body;
    const subCategory = yield sub_category_model_1.SubCategory.findById(sub_category_id).populate("category_id");
    if (!subCategory) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Sub category not found!");
    }
    // @ts-ignore
    req.body.category_id = subCategory.category_id._id.toString();
    if (req.file) {
        const file = req.file;
        const uploadedImage = yield fileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.banner = uploadedImage.secure_url;
        }
    }
    const result = (yield course_model_1.Course.create(req.body)).populate({
        path: "sub_category_id",
        select: "title _id",
        populate: {
            path: "category_id",
            select: "title _id",
        },
    });
    return result;
});
// get all courses
const getAllCourses = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: course_constants_1.courseFilterableFields.map((field) => ({
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
    let result = yield course_model_1.Course.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate({
        path: "sub_category_id",
        select: "title _id",
        populate: {
            path: "category_id",
            select: "title _id",
        },
    })
        .select("-createdAt -updatedAt -__v");
    const total = yield course_model_1.Course.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get Course
const getSingleCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id)
        .populate({
        path: "sub_category_id",
        select: "name _id",
        populate: {
            path: "category_id",
            select: "name _id",
        },
    })
        .select("-createdAt -updatedAt -__v");
    // if the Course is not found, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found!");
    }
    return result;
});
// update Course
const updateCourse = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // find course of given id
    const course = yield course_model_1.Course.findById(req.params.id);
    if (!course) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found!");
    }
    // if image is given, upload new, and delete old one
    if (req.file) {
        const file = req.file;
        const uploadedImage = yield fileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.banner = uploadedImage.secure_url;
        }
        if (course.banner) {
            // delete that course banner image from cloudinary
            fileUploadHelper_1.FileUploadHelper.deleteFromCloudinary(course === null || course === void 0 ? void 0 : course.banner);
        }
    }
    // updating course
    const result = yield course_model_1.Course.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
    });
    return result;
});
// delete course
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findById(id);
    if (!course) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found!");
    }
    else {
        if (course.banner) {
            // delete that course banner from cloudinary
            fileUploadHelper_1.FileUploadHelper.deleteFromCloudinary(course === null || course === void 0 ? void 0 : course.banner);
        }
    }
    // find and delete course in one operation
    const result = yield course_model_1.Course.findByIdAndDelete(id);
    return result;
});
exports.CourseService = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
};
