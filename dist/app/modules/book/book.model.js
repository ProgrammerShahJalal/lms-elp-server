"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    writer: { type: String },
    price: { type: Number },
    discount_price: { type: Number },
    description: { type: String },
    cover_page: { type: String },
    format: { type: String, required: true },
    pdf_link: { type: String },
    course_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course" },
}, { timestamps: true, toJSON: { virtuals: true } });
bookSchema.index({ title: 1, writer: 1, price: 1, format: 1, is_paid: 1 }, { unique: true });
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
