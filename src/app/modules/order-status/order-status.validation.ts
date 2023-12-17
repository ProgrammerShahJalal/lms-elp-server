import { z } from "zod";

const createOrderSchema = z.object({
  body: z.object({
    user_id: z.string({ required_error: "User id is required!" }),
    book_id: z.string({ required_error: "Book id is required!" }),
    book_quantity: z.number({ required_error: "Book quantity is required!" }),
    unit_price: z.number({ required_error: "Book unit price is required!" }),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    book_quantity: z.number({}).optional(),
    unit_price: z.number({}).optional(),
  }),
});

export const OrderValidation = {
  createOrderSchema,
  updateOrderZodSchema,
};
