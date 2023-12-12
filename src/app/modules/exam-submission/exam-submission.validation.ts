import { z } from "zod";

const createExamSubmissionZodSchema = z.object({
  body: z.object({
    user_id: z.string({
      required_error: "User id is required!",
    }),
    exam_id: z.string({
      required_error: "Exam id is required!",
    }),
    answer_link: z.string({
      required_error: "Answer link is required!",
    }),
  }),
});

const updateExamSubmissionZodSchema = z.object({
  body: z.object({
    user_id: z.string({}).optional(),
    exam_id: z.string({}).optional(),
    answer_link: z.string({}).optional(),
  }),
});

export const ExamSubmissionValidation = {
  createExamSubmissionZodSchema,
  updateExamSubmissionZodSchema,
};
