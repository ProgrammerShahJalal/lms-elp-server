"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = void 0;
const zod_1 = require("zod");
const createCourseSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: "Course name is required!",
    }),
    author: zod_1.z.string({}).optional(),
    membership_type: zod_1.z.enum(["0", "1"]).refine((value) => {
        return value === "0" || value === "1";
    }, {
        message: "Membership type must be either '0'(free) or '1'(paid)",
    }),
    sub_category_id: zod_1.z.string({
        required_error: "Sub category id is required!",
    }),
    description: zod_1.z.string({
        required_error: "Description is required!",
    }),
    banner: zod_1.z.string({}).optional(),
    syllabus: zod_1.z.string({}).optional(),
    study_materials: zod_1.z.string({}).optional(),
});
const updateCourseZodSchema = zod_1.z.object({
    title: zod_1.z.string({}).optional(),
    author: zod_1.z.string({}).optional(),
    membership_type: zod_1.z.enum(["0", "1"]).optional(),
    sub_category_id: zod_1.z.string({}).optional(),
    description: zod_1.z.string({}).optional(),
    banner: zod_1.z.string({}).optional(),
    syllabus: zod_1.z.string({}).optional(),
    study_materials: zod_1.z.string({}).optional(),
});
exports.CourseValidation = {
    createCourseSchema,
    updateCourseZodSchema,
};
