"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamResult = void 0;
const mongoose_1 = require("mongoose");
const examResultSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    exam_id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Exam" },
    exam_type: { type: String, enum: ["0", "1"], required: true },
    answer: { type: String, required: true },
    question_mark: {
        question_id: { type: mongoose_1.Schema.Types.ObjectId },
        mark_obtained: { type: Number },
    },
    total_marks: { type: Number, required: true },
    total_correct_answer: { type: Number },
    total_wrong_answer: { type: Number },
    isApproved: { type: Boolean },
}, { timestamps: true, toJSON: { virtuals: true } });
examResultSchema.index({ user_id: 1, exam_id: 1 }, { unique: true });
exports.ExamResult = (0, mongoose_1.model)("ExamResult", examResultSchema);
