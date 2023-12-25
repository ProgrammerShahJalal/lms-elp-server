import { z } from "zod";

const createOrderSchema = z.object({
  body: z.object({
    user_id: z.string({ required_error: "User id is required!" }),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    book_quantity: z.number({}).optional(),
  }),
});

export const OrderValidation = {
  createOrderSchema,
  updateOrderZodSchema,
};
