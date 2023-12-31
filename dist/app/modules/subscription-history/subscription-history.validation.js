"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionHistoryValidation = void 0;
const zod_1 = require("zod");
const createSubscriptionHistorySchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({ required_error: "User id is required!" }),
        subscription_id: zod_1.z.string({
            required_error: "Subscription id is required!",
        }),
    }),
});
const updateSubscriptionHistoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({}).optional(),
        course_id: zod_1.z.string({}).optional(),
        subscription_id: zod_1.z.string({}).optional(),
        expire_date: zod_1.z.date({}).optional(),
        amount: zod_1.z.number({}).optional(),
        trx_id: zod_1.z.string({}).optional(),
        is_active: zod_1.z.boolean({}).optional(),
    }),
});
exports.SubscriptionHistoryValidation = {
    createSubscriptionHistorySchema,
    updateSubscriptionHistoryZodSchema,
};
