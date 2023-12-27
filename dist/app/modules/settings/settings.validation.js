"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValidation = void 0;
const zod_1 = require("zod");
const addSettingsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        key: zod_1.z.string({
            required_error: "Settings key is required!",
        }),
        value: zod_1.z.any({
            required_error: "Settings value is required!",
        }),
    }),
});
const updateSettingsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        key: zod_1.z.string({}).optional(),
        value: zod_1.z.any({}).optional(),
    }),
});
exports.SettingsValidation = {
    addSettingsZodSchema,
    updateSettingsZodSchema,
};
