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
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const course_model_1 = require("../course/course.model");
const book_model_1 = require("./book.model");
const book_constants_1 = require("./book.constants");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const fileUploadHelper_1 = require("../../helpers/fileUploadHelper");
// create Book
const addBook = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // if the provided course_id have the course or not in db
    const { course_id } = req.body;
    if (course_id) {
        const course = yield course_model_1.Course.findById(course_id);
        if (!course) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found!");
        }
    }
    if (req.file) {
        const file = req.file;
        const uploadedImage = yield fileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.cover_page = uploadedImage.secure_url;
        }
    }
    const result = yield book_model_1.Book.create(req.body);
    return result;
});
// get all Books
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constants_1.bookSearchableFields.map((field) => ({
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
    const result = yield book_model_1.Book.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("course_id");
    const total = yield book_model_1.Book.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single Book
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    return result;
});
// update Book
const updateBook = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // find book of given id
    const book = yield book_model_1.Book.findById(req.params.id);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    // if image is given, upload new, and delete old one
    if (req.file) {
        const file = req.file;
        const uploadedImage = yield fileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            req.body.cover_page = uploadedImage.secure_url;
        }
        if (book.cover_page) {
            // delete that book cover page from cloudinary
            fileUploadHelper_1.FileUploadHelper.deleteFromCloudinary(book === null || book === void 0 ? void 0 : book.cover_page);
        }
    }
    // updating book
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
    });
    return result;
});
// delete Book
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    else {
        if (book.cover_page) {
            // delete that book cover page from cloudinary
            fileUploadHelper_1.FileUploadHelper.deleteFromCloudinary(book === null || book === void 0 ? void 0 : book.cover_page);
        }
    }
    // find and delete book in one operation
    const result = yield book_model_1.Book.findByIdAndDelete(id);
    return result;
});
exports.BookService = {
    addBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
