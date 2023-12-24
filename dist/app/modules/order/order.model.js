"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    book_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Book",
    },
    book_quantity: {
        type: Number,
        required: true,
    },
    unit_price: {
        type: Number,
        required: true,
    },
}, { timestamps: true, toJSON: { virtuals: true } });
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
