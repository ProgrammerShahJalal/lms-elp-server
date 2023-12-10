import { z } from "zod";

const createExamPaymentZodSchema = z.object({
  body: z.object({
    user_id: z.string({
      required_error: "User id is required!",
    }),
    exam: z.string({
      required_error: "Exam id is required!",
    }),
    invalid_date: z.date({}).optional(),
    trx_id: z.string({}).optional(),
    payment_date: z.date({
      required_error: "Payment date is required!",
    }),
  }),
});

const updateExamPaymentZodSchema = z.object({
  body: z.object({
    user_id: z.string({}).optional(),
    exam_id: z.string({}).optional(),
    invalid_date: z.date({}).optional(),
    trx_id: z.string({}).optional(),
    payment_date: z.date({}).optional(),
  }),
});

export const ExamPaymentValidation = {
  createExamPaymentZodSchema,
  updateExamPaymentZodSchema,
};
