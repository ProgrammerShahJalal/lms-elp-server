"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
const mongoose_1 = require("mongoose");
const orderStatusSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    order_details_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "OrderDetails",
    },
    shipping_address_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "ShippingAddress",
    },
    status: {
        type: String,
        required: true,
    },
}, { timestamps: true, toJSON: { virtuals: true } });
orderStatusSchema.index({ user_id: 1, order_details_id: 1, status: 1 }, { unique: true });
exports.OrderStatus = (0, mongoose_1.model)("OrderStatus", orderStatusSchema);
