"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionValidation = void 0;
const zod_1 = require("zod");
const createSubscriptionSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({}).optional(),
        subcription_duration_in_months: zod_1.z.number({
            required_error: "Subscription duration in months is required!",
        }),
        cost: zod_1.z.string({
            required_error: "Cost is required!",
        }),
        logo: zod_1.z.string({}).optional(),
        description: zod_1.z.string({}).optional(),
        course_id: zod_1.z.string({}).optional(),
    }),
});
const updateSubscriptionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({}).optional(),
        subcription_duration_in_months: zod_1.z.number({}).optional(),
        cost: zod_1.z.string({}).optional(),
        logo: zod_1.z.string({}).optional(),
        description: zod_1.z.string({}).optional(),
        course_id: zod_1.z.string({}).optional(),
    }),
});
exports.SubscriptionValidation = {
    createSubscriptionSchema,
    updateSubscriptionZodSchema,
};
