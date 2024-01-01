"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = void 0;
const zod_1 = require("zod");
const createCartZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({
            required_error: "User id required!",
        }),
        book_id: zod_1.z.string({
            required_error: "Book id required!",
        }),
        quantity: zod_1.z.number({}).positive().optional(),
    }),
});
const updateCartZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book_id: zod_1.z.string({}).optional(),
        quantity: zod_1.z.number({}).optional(),
    }),
});
exports.CartValidation = {
    createCartZodSchema,
    updateCartZodSchema,
};
