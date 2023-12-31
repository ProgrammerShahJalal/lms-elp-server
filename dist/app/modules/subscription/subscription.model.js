"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const mongoose_1 = require("mongoose");
const subscriptionSchema = new mongoose_1.Schema({
    name: { type: String },
    subscription_duration_in_months: { type: Number, required: true },
    cost: { type: Number, required: true },
    logo: { type: String },
    description: { type: String },
    course_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
}, { timestamps: true, toJSON: { virtuals: true } });
subscriptionSchema.index({ subcription_duration_in_months: 1, cost: 1, name: 1, course_id: 1 }, { unique: true });
exports.Subscription = (0, mongoose_1.model)("Subscription", subscriptionSchema);
