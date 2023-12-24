"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    contact_no: { type: String, unique: true, sparse: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } });
exports.User = (0, mongoose_1.model)("User", userSchema);
