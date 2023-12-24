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
exports.ExamPaymentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const exam_model_1 = require("../exam/exam.model");
const exam_payment_model_1 = require("./exam-payment.model");
// create Exam Payment
const createExamPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // if the provided user_id have the user or not in db
    const { user_id, exam_id } = payload;
    const user = yield user_model_1.User.findById(user_id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // if the provided exam_id have the exam or not in db
    const exam = yield exam_model_1.Exam.findById(exam_id);
    if (!exam) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Exam not found!");
    }
    const result = yield exam_payment_model_1.ExamPayment.create(payload);
    return result;
});
// get all Exam Payments
const getAllExamPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_payment_model_1.ExamPayment.find({});
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No exam payment found!");
    }
    return result;
});
// get single Exam Payment
const getSingleExamPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_payment_model_1.ExamPayment.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Exam payment not found!");
    }
    return result;
});
// update Exam Payment
const updateExamPayment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_payment_model_1.ExamPayment.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't update. Exam payment was not found!");
    }
    return result;
});
// delete Exam Payment
const deleteExamPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_payment_model_1.ExamPayment.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Couldn't delete. Exam payment wasn't found!");
    }
    return result;
});
exports.ExamPaymentService = {
    createExamPayment,
    getAllExamPayments,
    getSingleExamPayment,
    updateExamPayment,
    deleteExamPayment,
};
