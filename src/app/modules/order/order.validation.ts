import { z } from "zod";

const createOrderZodSchema = z.object({
  body: z.object({
    trx_id: z.string({
      required_error: "Transaction id is required!",
    }),
    shipping_address: z.string({}).optional(),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    book_quantity: z.number({}).optional(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
  updateOrderZodSchema,
};
