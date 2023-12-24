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
exports.ExamResultService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const exam_result_model_1 = require("./exam-result.model");
const user_model_1 = require("../user/user.model");
const exam_model_1 = require("../exam/exam.model");
const exam_result_constants_1 = require("./exam-result.constants");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
// create ExamResult
const createExamResult = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // if the provided user_id have the user or not in db
    const { user_id, exam_id } = payload;
    const user = yield user_model_1.User.findById(user_id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // if the provided user_id have the user or not in db
    const exam = yield exam_model_1.Exam.findById(exam_id);
    if (!exam) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Exam not found!");
    }
    let result;
    payload.total_marks = exam.total_marks;
    payload.exam_type = exam.exam_type;
    if (exam.exam_type === "1") {
        // if written exam is submitted by student
        if (!payload.answer) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please provide your answer link.");
        }
        result = yield exam_result_model_1.ExamResult.create(payload);
        return result;
    }
    else if (exam.exam_type === "0") {
        // if quiz exam is submitted by student
        result = yield exam_result_model_1.ExamResult.create(payload);
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid exam type!");
    }
});
// create/give exam question mark
const giveQuestionMark = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const examResult = yield exam_result_model_1.ExamResult.findOne({
        user_id: payload.user_id,
        exam_id: payload.exam_id,
    });
    if (!examResult) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid user id or exam id!");
    }
    let totalCorrectAnswer = 0;
    for (const mark of payload.marks) {
        totalCorrectAnswer += mark.mark_obtained;
    }
    const result = yield exam_result_model_1.ExamResult.updateOne({ _id: examResult._id }, {
        $set: {
            question_mark: payload.marks,
            totalCorrectAnswer: totalCorrectAnswer,
            total_wrong_answer: examResult.total_marks - totalCorrectAnswer,
        },
    }, {
        new: true,
    });
    return result;
});
// get all ExamResults
const getAllExamResults = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: exam_result_constants_1.examResultFilterableFields.map((field) => ({
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
    const result = yield exam_result_model_1.ExamResult.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("course_id");
    const total = yield exam_result_model_1.ExamResult.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single ExamResult
const getSingleExamResult = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_result_model_1.ExamResult.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Exam result not found!");
    }
    return result;
});
// update ExamResult
const updateExamResult = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_result_model_1.ExamResult.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// delete ExamResult
const deleteExamResult = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_result_model_1.ExamResult.findByIdAndDelete(id);
    return result;
});
exports.ExamResultService = {
    createExamResult,
    giveQuestionMark,
    getAllExamResults,
    getSingleExamResult,
    updateExamResult,
    deleteExamResult,
};
