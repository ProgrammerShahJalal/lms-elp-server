"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamValidation = void 0;
const zod_1 = require("zod");
const createExamZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Exam name is required!",
        }),
        description: zod_1.z.string({
            required_error: "Description is required!",
        }),
        total_marks: zod_1.z.number({
            required_error: "Total marks is required!",
        }),
        duration_in_minutes: zod_1.z.number({
            required_error: "Duration in minutes is required!",
        }),
        fee: zod_1.z.number({}),
        is_active: zod_1.z.boolean({ required_error: "Is active is required!" }),
        exam_type: zod_1.z.enum(["0", "1"], {
            required_error: "Exam type is required!",
        }),
        course_id: zod_1.z.string({}),
    }),
});
const updateExamZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({}).optional(),
        description: zod_1.z.string({}).optional(),
        total_marks: zod_1.z.number({}).optional(),
        duration_in_minutes: zod_1.z.number({}).optional(),
        fee: zod_1.z.number({}).optional(),
        is_active: zod_1.z.boolean({}).optional(),
        exam_type: zod_1.z.string({}).optional(),
        course_id: zod_1.z.string({}).optional(),
    }),
});
exports.ExamValidation = {
    createExamZodSchema,
    updateExamZodSchema,
};
