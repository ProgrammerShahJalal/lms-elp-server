"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusValidation = void 0;
const zod_1 = require("zod");
const createOrderStatusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({
            required_error: "User id is required!",
        }),
        order_details_id: zod_1.z.string({
            required_error: "Order details id is required!",
        }),
        shipping_address_id: zod_1.z.string({
            required_error: "Shipping address id is required!",
        }),
        status: zod_1.z.enum([
            "Pending Approval",
            "Approved",
            "On The Way",
            "Did Not Receive",
            "Delivered",
        ], {
            required_error: "Order status is required!",
        }),
    }),
});
const updateOrderStatusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        shipping_address_id: zod_1.z.string({}).optional(),
        status: zod_1.z
            .enum([
            "Pending Approval",
            "Approved",
            "On The Way",
            "Did Not Receive",
            "Delivered",
        ])
            .optional(),
    }),
});
exports.OrderStatusValidation = {
    createOrderStatusZodSchema,
    updateOrderStatusZodSchema,
};
