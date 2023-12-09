import { z } from "zod";

const createQuestionZodSchema = z.object({
  body: z.object({
    question: z.string({
      required_error: "Question is required!",
    }),
    a: z.string({}).optional(),
    b: z.string({}).optional(),
    c: z.string({}).optional(),
    d: z.string({}).optional(),
    correct_answer: z.string({}).optional(),
    exam_id: z.string({
      required_error: "Exam id is required",
    }),
    question_type: z.enum(["0", "1"] as const, {
      required_error: "Question type is required!",
    }),
  }),
});

const updateQuestionZodSchema = z.object({
  body: z.object({
    question: z.string({}).optional(),
    a: z.string({}).optional(),
    b: z.string({}).optional(),
    c: z.string({}).optional(),
    d: z.string({}).optional(),
    correct_answer: z.string({}).optional(),
    exam_id: z.string({}).optional(),
    question_type: z.enum(["0", "1"] as const).optional(),
  }),
});

export const QuestionValidation = {
  createQuestionZodSchema,
  updateQuestionZodSchema,
};
