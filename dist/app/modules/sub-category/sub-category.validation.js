"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryValidation = void 0;
const zod_1 = require("zod");
const createSubCategorySchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: "Sub Category name is required!",
    }),
    icon: zod_1.z.string({}).optional(),
    category_id: zod_1.z.string({
        required_error: "Category id is required!",
    }),
});
const updateSubCategoryZodSchema = zod_1.z.object({
    title: zod_1.z.string({}).optional(),
    icon: zod_1.z.string({}).optional(),
    category_id: zod_1.z.string({}).optional(),
});
exports.SubCategoryValidation = {
    createSubCategorySchema,
    updateSubCategoryZodSchema,
};
