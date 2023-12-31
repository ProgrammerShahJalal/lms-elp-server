"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamPayment = void 0;
const mongoose_1 = require("mongoose");
const examPaymentSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    exam_id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Exam" },
    trx_id: { type: String, required: true, unique: true },
}, { timestamps: true, toJSON: { virtuals: true } });
examPaymentSchema.index({ user_id: 1, exam_id: 1, trx_id: 1 }, { unique: true });
exports.ExamPayment = (0, mongoose_1.model)("ExamPayment", examPaymentSchema);
