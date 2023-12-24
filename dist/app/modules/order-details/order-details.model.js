"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetails = void 0;
const mongoose_1 = require("mongoose");
const orderDetailsSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    shipping_address_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ShippingAddress",
    },
    shipping_address: {
        type: String,
    },
    total_price: {
        type: Number,
        required: true,
    },
    discounts: {
        type: Number,
    },
    orders: {
        type: String,
        required: true,
    },
    trx_id: {
        type: String,
        required: true,
    },
}, { timestamps: true, toJSON: { virtuals: true } });
orderDetailsSchema.index({ user_id: 1, trx_id: 1, shipping_address_id: 1 }, { unique: true });
exports.OrderDetails = (0, mongoose_1.model)("OrderDetails", orderDetailsSchema);
