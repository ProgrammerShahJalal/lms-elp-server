import { z } from "zod";
const createCartZodSchema = z.object({
  body: z.object({
    book_id: z.string({
      required_error: "Book id required!",
    }),
    quantity: z.number({}).optional(),
  }),
});

const updateCartZodSchema = z.object({
  body: z.object({
    quantity: z.number({}).optional(),
  }),
});

export const CartValidation = {
  createCartZodSchema,
  updateCartZodSchema,
};
