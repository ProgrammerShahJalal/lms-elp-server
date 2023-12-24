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
exports.QuestionService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const exam_model_1 = require("../exam/exam.model");
const question_model_1 = require("./question.model");
const question_constants_1 = require("./question.constants");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
// creating question
const createQuestion = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the provided exam_id have exam in the db or not
    const { exam_id } = payload;
    if (exam_id) {
        const exam = yield exam_model_1.Exam.findById(exam_id);
        if (!exam) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Exam not found!");
        }
        // if adding this question to the exam exceeds the total_marks limit for the exam
        const { total_marks } = exam;
        const questions = yield question_model_1.Question.find({
            exam_id,
        });
        const totalMarkQuestionAdded = questions.reduce((sum, question) => sum + (question.mark || 0), 0);
        if (totalMarkQuestionAdded + payload.mark > total_marks) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Adding this question exceeds ${total_marks} marks for this exam.`);
        }
    }
    const result = yield question_model_1.Question.create(payload);
    return result;
});
// get all questions
const getAllQuestions = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: question_constants_1.questionSearchableFields.map((field) => ({
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
    const result = yield question_model_1.Question.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("exam_id");
    const total = yield question_model_1.Question.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single quiz question
const getSingleQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_model_1.Question.findById(id).populate("exam_id");
    // if question not found, throw error
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Question not found!");
    }
    return result;
});
// update quiz question
const updateQuestion = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_model_1.Question.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't update. Question not found!");
    }
    return result;
});
// delete quiz question
const deleteQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_model_1.Question.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't delete. Question not found!");
    }
    return result;
});
exports.QuestionService = {
    createQuestion,
    getAllQuestions,
    getSingleQuestion,
    updateQuestion,
    deleteQuestion,
};
