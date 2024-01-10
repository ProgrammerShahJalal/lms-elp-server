"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionHistory = void 0;
const mongoose_1 = require("mongoose");
const subscriptionHistorySchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    course_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
    subscription_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Subscription",
    },
    expire_date: { type: Date, required: true },
    amount: { type: Number, required: true },
    trx_id: { type: String },
    is_active: { type: Boolean },
}, { timestamps: true, toJSON: { virtuals: true } });
subscriptionHistorySchema.index({ user_id: 1, trx_id: 1 }, { unique: true });
exports.SubscriptionHistory = (0, mongoose_1.model)("SubscriptionHistory", subscriptionHistorySchema);
