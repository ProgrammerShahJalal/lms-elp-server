"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const mongoose_1 = require("mongoose");
const subCategorySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    icon: { type: String },
    category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
}, { timestamps: true, toJSON: { virtuals: true } });
subCategorySchema.index({ title: 1, category_id: 1 }, { unique: true });
exports.SubCategory = (0, mongoose_1.model)("SubCategory", subCategorySchema);
