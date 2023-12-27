"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    book_id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Book" },
    quantity: { type: Number },
}, { timestamps: true, toJSON: { virtuals: true } });
cartSchema.index({ user_id: 1, book_id: 1 }, { unique: true });
exports.Cart = (0, mongoose_1.model)("Cart", cartSchema);
