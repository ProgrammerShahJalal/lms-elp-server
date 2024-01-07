import { z } from "zod";

const createOrderStatusZodSchema = z.object({
  body: z.object({
    user_id: z.string({
      required_error: "User id is required!",
    }),
    order_details_id: z.string({
      required_error: "Order details id is required!",
    }),
    shipping_address_id: z.string({
      required_error: "Shipping address id is required!",
    }),
    status: z.string({ required_error: "Status is required!" }),
  }),
});

const updateOrderStatusZodSchema = z.object({
  body: z.object({
    shipping_address_id: z.string({}).optional(),
    status: z.string({}).optional(),
  }),
});

export const OrderStatusValidation = {
  createOrderStatusZodSchema,
  updateOrderStatusZodSchema,
};
