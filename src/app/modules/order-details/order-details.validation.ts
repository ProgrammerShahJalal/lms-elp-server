import { z } from "zod";

const createOrderDetailsSchema = z.object({
  body: z.object({
    user_id: z.string({ required_error: "User id is required!" }),
    shipping_address_id: z.string({}).optional(),
    shipping_address: z.string({}).optional(),
    shipping_charge: z.number({}).optional(),
    orders: z.string({ required_error: "Orders are required!" }),
    total_price: z.number().positive().optional(),
    discounts: z.number().positive().optional(),
    trx_id: z.string({ required_error: "Transaction id is required!" }),
  }),
});

const updateOrderDetailsZodSchema = z.object({
  body: z.object({
    user_id: z.string({}).optional(),
    shipping_address_id: z.string({}).optional(),
    shipping_address: z.string({}).optional(),
    orders: z.string({}).optional(),
    trx_id: z.string({}).optional(),
    discounts: z.number({}).optional(),
  }),
});

export const OrderDetailsValidation = {
  createOrderDetailsSchema,
  updateOrderDetailsZodSchema,
};
