import { z } from "zod";

const updateOrderZodSchema = z.object({
  body: z.object({
    book_quantity: z.number({}).optional(),
  }),
});

export const OrderValidation = {
  updateOrderZodSchema,
};
