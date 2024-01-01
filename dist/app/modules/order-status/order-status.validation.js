"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        order_details_id: zod_1.z.string({
            required_error: "Order details id is required!",
        }),
        status: zod_1.z.string({ required_error: "Status is required!" }),
    }),
});
const updateOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        order_details_id: zod_1.z.string({}).optional(),
        status: zod_1.z.string({}).optional(),
        shipping_id: zod_1.z.string({}).optional(),
    }),
});
exports.OrderValidation = {
    createOrderSchema,
    updateOrderZodSchema,
};
