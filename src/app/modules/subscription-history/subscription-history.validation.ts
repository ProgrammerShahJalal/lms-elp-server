import { z } from "zod";

const createSubscriptionHistorySchema = z.object({
  body: z.object({
    user_id: z.string({ required_error: "User id is required!" }),
    subscription_id: z.string({
      required_error: "Subscription id is required!",
    }),
  }),
});

const updateSubscriptionHistoryZodSchema = z.object({
  body: z.object({
    user_id: z.string({}).optional(),
    course_id: z.string({}).optional(),
    subscription_id: z.string({}).optional(),
    expire_date: z.date({}).optional(),
    amount: z.number({}).optional(),
    trx_id: z.string({}).optional(),
    is_active: z.boolean({}).optional(),
  }),
});

export const SubscriptionHistoryValidation = {
  createSubscriptionHistorySchema,
  updateSubscriptionHistoryZodSchema,
};
