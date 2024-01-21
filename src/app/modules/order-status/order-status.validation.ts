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
    status: z.enum(
      ["Pending Approval", "Approved", "On The Way", "Delivered"] as const,
      {
        required_error: "Order status is required!",
      }
    ),
  }),
});

const updateOrderStatusZodSchema = z.object({
  body: z.object({
    shipping_address_id: z.string({}).optional(),
    status: z
      .enum([
        "Pending Approval",
        "Approved",
        "On The Way",
        "Delivered",
      ] as const)
      .optional(),
  }),
});

export const OrderStatusValidation = {
  createOrderStatusZodSchema,
  updateOrderStatusZodSchema,
};
