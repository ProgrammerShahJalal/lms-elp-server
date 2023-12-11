import { z } from "zod";

const createQuizSubmissionZodSchema = z.object({
  body: z.object({
    user_id: z.string({
      required_error: "User id is required!",
    }),
    exam_id: z.string({
      required_error: "Exam id is required!",
    }),
    question_id: z.string({
      required_error: "Question id is required!",
    }),
    answer: z.enum(["a", "b", "c", "d"] as const, {
      required_error: "Answer(a/b/c/d) is required!",
    }),
  }),
});

const updateQuizSubmissionZodSchema = z.object({
  body: z.object({
    user_id: z.string({}).optional(),
    exam_id: z.string({}).optional(),
    question_id: z.string({}).optional(),
    answer: z.enum(["a", "b", "c", "d"] as const).optional(),
  }),
});

export const QuizSubmissionValidation = {
  createQuizSubmissionZodSchema,
  updateQuizSubmissionZodSchema,
};
