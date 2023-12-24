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
exports.ExamService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const course_model_1 = require("../course/course.model");
const exam_model_1 = require("./exam.model");
const exam_constants_1 = require("./exam.constants");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
// create exam
const createExam = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // if the provided course_id have the course or not in db
    const { course_id } = payload;
    if (course_id) {
        const course = yield course_model_1.Course.findById(course_id);
        if (!course) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Course not found!");
        }
    }
    const result = yield exam_model_1.Exam.create(payload);
    return result;
});
// get all exams
const getAllExams = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: exam_constants_1.examSearchableFields.map((field) => ({
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
    const result = yield exam_model_1.Exam.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("course_id");
    const total = yield exam_model_1.Exam.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single exam
const getSingleExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.Exam.findById(id).populate("course_id");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Exam not found!");
    }
    return result;
});
// update exam
const updateExam = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.Exam.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// delete exam
const deleteExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.Exam.findByIdAndDelete(id);
    return result;
});
exports.ExamService = {
    createExam,
    getAllExams,
    getSingleExam,
    updateExam,
    deleteExam,
};
