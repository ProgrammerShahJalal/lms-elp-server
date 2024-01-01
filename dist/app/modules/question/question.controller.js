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
exports.QuestionController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const question_service_1 = require("./question.service");
const question_constants_1 = require("./question.constants");
const pagination_1 = require("../../constants/pagination");
const pick_1 = __importDefault(require("../../../shared/pick"));
const exam_payment_model_1 = require("../exam-payment/exam-payment.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const exam_model_1 = require("../exam/exam.model");
const createQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield question_service_1.QuestionService.createQuestion(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Question added successfully!",
        data: result,
    });
}));
const getAllQuestions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, question_constants_1.questionFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield question_service_1.QuestionService.getAllQuestions(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All questions fetched successfully!",
        data: result,
    });
}));
const getQuestionsOfAnExam = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { exam_id } = req.params;
    const exam = yield exam_model_1.Exam.findById(exam_id);
    if (!exam) {
        throw new ApiError_1.default(http_status_1.default.OK, "Exam not found!");
    }
    const examPayment = yield exam_payment_model_1.ExamPayment.findOne({
        exam_id: exam_id,
        user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
    });
    // if there is exam fee and you haven't paid, throw error
    if (exam.fee && !examPayment) {
        throw new ApiError_1.default(http_status_1.default.OK, "You have to pay first for the exam!");
    }
    const result = yield question_service_1.QuestionService.getQuestionsOfAnExam(exam_id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Questions fetched successfully!",
        data: result,
    });
}));
const getSingleQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield question_service_1.QuestionService.getSingleQuestion(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Question fetched successfully!",
        data: result,
    });
}));
const updateQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield question_service_1.QuestionService.updateQuestion(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Question updated in successfully!",
        data: result,
    });
}));
const deleteQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield question_service_1.QuestionService.deleteQuestion(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Question deleted in successfully!",
        data: result,
    });
}));
exports.QuestionController = {
    createQuestion,
    getAllQuestions,
    getQuestionsOfAnExam,
    getSingleQuestion,
    updateQuestion,
    deleteQuestion,
};
