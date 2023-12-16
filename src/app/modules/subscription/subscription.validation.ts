import { z } from "zod";

const createSubscriptionSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    subcription_duration_in_months: z.number({
      required_error: "Subscription duration in months is required!",
    }),
    cost: z.string({
      required_error: "Cost is required!",
    }),
    logo: z.string({}).optional(),
    description: z.string({}).optional(),
    course_id: z.string({}).optional(),
  }),
});

const updateSubscriptionZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    subcription_duration_in_months: z.number({}).optional(),
    cost: z.string({}).optional(),
    logo: z.string({}).optional(),
    description: z.string({}).optional(),
    course_id: z.string({}).optional(),
  }),
});

export const SubscriptionValidation = {
  createSubscriptionSchema,
  updateSubscriptionZodSchema,
};
