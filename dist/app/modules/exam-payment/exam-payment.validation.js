"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamPaymentValidation = void 0;
const zod_1 = require("zod");
const createExamPaymentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({
            required_error: "User id is required!",
        }),
        exam_id: zod_1.z.string({
            required_error: "Exam id is required!",
        }),
        invalid_date: zod_1.z.date({}).optional(),
        trx_id: zod_1.z.string({}).optional(),
    }),
});
const updateExamPaymentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({}).optional(),
        exam_id: zod_1.z.string({}).optional(),
        invalid_date: zod_1.z.date({}).optional(),
        trx_id: zod_1.z.string({}).optional(),
    }),
});
exports.ExamPaymentValidation = {
    createExamPaymentZodSchema,
    updateExamPaymentZodSchema,
};
