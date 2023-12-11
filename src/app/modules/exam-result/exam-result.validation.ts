import { z } from "zod";
const createExamResultZodSchema = z.object({
  body: z.object({
    user_id: z.string({
      required_error: "user_id is required",
    }),
    exam_id: z.string({
      required_error: "exam_id is required",
    }),
    total_mark: z.number({}).optional(),
    total_mark_obtained: z.number({
      required_error: "Total marks",
    }),
  }),
});

const updateExamResultZodSchema = z.object({
  body: z.object({
    user_id: z.string({}).optional(),
    exam_id: z.string({}).optional(),
    total_mark: z.number({}).optional(),
    total_mark_obtained: z.number({}).optional(),
  }),
});

export const ExamResultValidation = {
  createExamResultZodSchema,
  updateExamResultZodSchema,
};
