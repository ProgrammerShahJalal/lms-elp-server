"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailsValidation = void 0;
const zod_1 = require("zod");
const createOrderDetailsSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({ required_error: "User id is required!" }),
        shipping_address_id: zod_1.z.string({}).optional(),
        shipping_address: zod_1.z.string({}).optional(),
        shipping_charge: zod_1.z.number({}).optional(),
        orders: zod_1.z.string({ required_error: "Orders are required!" }),
        total_price: zod_1.z.number().positive().optional(),
        discounts: zod_1.z.number().positive().optional(),
        trx_id: zod_1.z.string({ required_error: "Transaction id is required!" }),
    }),
});
const updateOrderDetailsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({}).optional(),
        shipping_address_id: zod_1.z.string({}).optional(),
        shipping_address: zod_1.z.string({}).optional(),
        orders: zod_1.z.string({}).optional(),
        trx_id: zod_1.z.string({}).optional(),
        discounts: zod_1.z.number({}).optional(),
    }),
});
exports.OrderDetailsValidation = {
    createOrderDetailsSchema,
    updateOrderDetailsZodSchema,
};
