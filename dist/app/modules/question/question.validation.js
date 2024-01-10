"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionValidation = void 0;
const zod_1 = require("zod");
const createQuestionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({
            required_error: "Question is required!",
        }),
        a: zod_1.z.string({}).optional(),
        b: zod_1.z.string({}).optional(),
        c: zod_1.z.string({}).optional(),
        d: zod_1.z.string({}).optional(),
        correct_answer: zod_1.z.string({}).optional(),
        exam_id: zod_1.z.string({
            required_error: "Exam id is required",
        }),
        exam_type: zod_1.z.enum(["0", "1"], {
            required_error: "Exam type is required!",
        }),
        mark: zod_1.z.number({}).default(1).optional(),
    }),
});
const updateQuestionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({}).optional(),
        a: zod_1.z.string({}).optional(),
        b: zod_1.z.string({}).optional(),
        c: zod_1.z.string({}).optional(),
        d: zod_1.z.string({}).optional(),
        correct_answer: zod_1.z.string({}).optional(),
        exam_id: zod_1.z.string({}).optional(),
        exam_type: zod_1.z.enum(["0", "1"]).optional(),
        mark: zod_1.z.number({}).optional(),
    }),
});
exports.QuestionValidation = {
    createQuestionZodSchema,
    updateQuestionZodSchema,
};
