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
    exam_type: z.enum(["0", "1"] as const, {
      required_error: "Exam type is required!",
    }),
    mark: z.number({}).optional(),
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
    exam_type: z.enum(["0", "1"] as const).optional(),
    mark: z.number({}).optional(),
  }),
});

export const QuestionValidation = {
  createQuestionZodSchema,
  updateQuestionZodSchema,
};
