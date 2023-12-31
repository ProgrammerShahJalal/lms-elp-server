"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({ required_error: "User id is required!" }),
    }),
});
const updateOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book_quantity: zod_1.z.number({}).optional(),
    }),
});
exports.OrderValidation = {
    createOrderSchema,
    updateOrderZodSchema,
};
