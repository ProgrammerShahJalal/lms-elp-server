"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const addBookZodSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: "Book title is required!",
    }),
    writer: zod_1.z.string({}).optional(),
    price: zod_1.z.number({}).optional(),
    discount_price: zod_1.z.number({}).optional(),
    cover_page: zod_1.z.string({}).optional(),
    format: zod_1.z.enum(["pdf", "hard copy"]).refine((value) => {
        return value === "pdf" || value === "hard copy";
    }, {
        message: "Format type must be either 'pdf' or 'hard copy'",
    }),
    pdf_link: zod_1.z.string({}).optional(),
    course_id: zod_1.z.string({}).optional(),
});
const updateBookZodSchema = zod_1.z.object({
    title: zod_1.z.string({}).optional(),
    writer: zod_1.z.string({}).optional(),
    price: zod_1.z.number({}).optional(),
    discount_price: zod_1.z.number({}).optional(),
    cover_page: zod_1.z.string({}).optional(),
    format: zod_1.z
        .enum(["pdf", "hard copy"])
        .refine((value) => {
        return value === "pdf" || value === "hard copy";
    }, {
        message: "Format type must be either 'pdf' or 'hard copy'",
    })
        .optional(),
    pdf_link: zod_1.z.string({}).optional(),
    course_id: zod_1.z.string({}).optional(),
});
exports.BookValidation = {
    addBookZodSchema,
    updateBookZodSchema,
};
