import { z } from "zod";

const createOrderZodSchema = z.object({
  body: z.object({
    trx_id: z.string({
      required_error: "Transaction id is required!",
    }),
    paymentID: z.string({
      required_error: "Payment id is required!",
    }),
    shipping_address: z.string({}).optional(),
    books: z.array(
      z.object({
        book_id: z.string({ required_error: "Book id is required!" }),
        quantity: z.number({ required_error: "Book quantity is required!" }),
      })
    ),
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
