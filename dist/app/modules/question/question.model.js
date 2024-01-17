"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    options: [{ type: Map, of: String }],
    correct_answer: { type: String },
    mark: { type: Number, required: true, default: 1 },
    exam_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Exam" },
    exam_type: { type: String },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
questionSchema.index({ question: 1, exam_id: 1 }, { unique: true });
exports.Question = (0, mongoose_1.model)("Question", questionSchema);
