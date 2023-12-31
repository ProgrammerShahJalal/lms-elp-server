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
exports.ExamResultController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const exam_result_service_1 = require("./exam-result.service");
const exam_result_constants_1 = require("./exam-result.constants");
const pagination_1 = require("../../constants/pagination");
const pick_1 = __importDefault(require("../../../shared/pick"));
const exam_result_model_1 = require("./exam-result.model");
const exam_payment_model_1 = require("../exam-payment/exam-payment.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createExamResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
    const examResult = yield exam_result_model_1.ExamResult.find({
        user_id: user_id,
        exam_id: req.body.exam_id,
    });
    const examPayment = yield exam_payment_model_1.ExamPayment.find({
        user_id,
        exam_id: req.body.exam_id,
    });
    if (examResult.length >= examPayment.length) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Already exam result is created for this user!");
    }
    const result = yield exam_result_service_1.ExamResultService.createExamResult(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Exam result added successfully!",
        data: result,
    });
}));
const giveQuestionMark = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_result_service_1.ExamResultService.giveQuestionMark(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Exam result updated successfully!",
        data: result,
    });
}));
const getAllExamResults = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, exam_result_constants_1.examResultFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield exam_result_service_1.ExamResultService.getAllExamResults(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All Exam results fetched successfully!",
        data: result,
    });
}));
const getSingleExamResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield exam_result_service_1.ExamResultService.getSingleExamResult(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Exam result fetched successfully!",
        data: result,
    });
}));
const updateExamResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield exam_result_service_1.ExamResultService.updateExamResult(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Exam result updated in successfully!",
        data: result,
    });
}));
const deleteExamResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield exam_result_service_1.ExamResultService.deleteExamResult(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Exam result deleted in successfully!",
        data: result,
    });
}));
exports.ExamResultController = {
    createExamResult,
    giveQuestionMark,
    getAllExamResults,
    getSingleExamResult,
    updateExamResult,
    deleteExamResult,
};
