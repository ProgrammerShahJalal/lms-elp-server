import { z } from "zod";

const createOrderSchema = z.object({
  body: z.object({
    order_details_id: z.string({
      required_error: "Order details id is required!",
    }),
    status: z.string({ required_error: "Status is required!" }),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    order_details_id: z.string({}).optional(),
    status: z.string({}).optional(),
    shipping_id: z.string({}).optional(),
  }),
});

export const OrderValidation = {
  createOrderSchema,
  updateOrderZodSchema,
};
