"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddress = void 0;
const mongoose_1 = require("mongoose");
const shippingAddressSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User",
    },
    outside_dhaka: { type: Boolean, required: true },
    division: { type: String, required: true },
    district: { type: String, required: true },
    upazilla: { type: String, required: true },
    address: { type: String, required: true },
    contact_no: { type: String, required: true },
    is_default: { type: Boolean, required: true },
    billing_name: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
exports.ShippingAddress = (0, mongoose_1.model)("ShippingAddress", shippingAddressSchema);
