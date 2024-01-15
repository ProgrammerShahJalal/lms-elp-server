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
const exam_payment_model_1 = require("../exam-payment/exam-payment.model");
const exam_result_model_1 = require("../exam-result/exam-result.model");
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
// get all due exams
const getMyDueExams = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const dueExamIds = [];
    const examsPayed = yield exam_payment_model_1.ExamPayment.find({
        user_id,
    });
    for (const examPayed of examsPayed) {
        const examResult = yield exam_result_model_1.ExamResult.findOne({
            user_id,
            exam_id: examPayed === null || examPayed === void 0 ? void 0 : examPayed.exam_id,
        }).select("exam_id answer");
        if (!examResult || !(examResult === null || examResult === void 0 ? void 0 : examResult.answer)) {
            dueExamIds.push(examPayed === null || examPayed === void 0 ? void 0 : examPayed.exam_id.toString());
        }
    }
    if (!dueExamIds.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No exam due for you!");
    }
    return dueExamIds;
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
    getMyDueExams,
    getSingleExam,
    updateExam,
    deleteExam,
};
