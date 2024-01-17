import { z } from "zod";

const createPaymentZodSchema = z.object({
  amount: z.string({
    required_error: "Amount is required!",
  }),
});

export const BkashPaymentValidation = {
  createPaymentZodSchema,
};
