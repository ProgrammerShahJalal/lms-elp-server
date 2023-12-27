"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String },
    membership_type: { type: String, required: true },
    sub_category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "SubCategory",
    },
    category_id: { type: String },
    description: { type: String, required: true },
    banner: { type: String },
    syllabus: { type: String },
    study_materials: { type: String },
}, { timestamps: true, toJSON: { virtuals: true } });
courseSchema.index({ name: 1, author: 1, membership_type: 1, sub_category_id: 1 }, { unique: true });
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
