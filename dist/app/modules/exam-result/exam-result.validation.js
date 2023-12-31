"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamResultValidation = exports.giveQuestionMarkZodSchema = void 0;
const zod_1 = require("zod");
const createExamResultZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string(),
        exam_id: zod_1.z.string(),
        exam_type: zod_1.z.enum(["0", "1"]),
        answer: zod_1.z.string({}),
        total_marks: zod_1.z.number().positive(),
        total_correct_answer: zod_1.z.number().default(0),
        total_wrong_answer: zod_1.z.number().default(0),
        isApproved: zod_1.z.boolean().default(false),
    }),
});
const updateExamResultZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({}).optional(),
        exam_id: zod_1.z.string({}).optional(),
        answer: zod_1.z.string({}).optional(),
        question_mark: zod_1.z
            .object({
            question_id: zod_1.z.string().optional(),
            mark_obtained: zod_1.z.number().optional(),
        })
            .optional(),
        total_marks: zod_1.z.number().optional(),
        total_correct_answer: zod_1.z.number().optional(),
        total_wrong_answer: zod_1.z.number().optional(),
        isApproved: zod_1.z.boolean().optional(),
    }),
});
const questionMarkSchema = zod_1.z.object({
    question_id: zod_1.z.string(),
    mark_obtained: zod_1.z.number(),
});
exports.giveQuestionMarkZodSchema = zod_1.z.object({
    exam_id: zod_1.z.string(),
    user_id: zod_1.z.string(),
    marks: zod_1.z.array(questionMarkSchema),
});
exports.ExamResultValidation = {
    createExamResultZodSchema,
    updateExamResultZodSchema,
    giveQuestionMarkZodSchema: exports.giveQuestionMarkZodSchema,
};
