"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exam = void 0;
const mongoose_1 = require("mongoose");
const examSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    total_marks: { type: Number, required: true },
    duration_in_minutes: { type: Number, required: true },
    fee: { type: Number, required: true },
    is_active: { type: Boolean, required: true, default: false },
    exam_type: { type: String, required: true },
    course_id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Course" },
}, { timestamps: true, toJSON: { virtuals: true } });
examSchema.index({ title: 1, course_id: 1, sub_category_id: 1, exam_type: 1, is_active: 1 }, { unique: true });
exports.Exam = (0, mongoose_1.model)("Exam", examSchema);
