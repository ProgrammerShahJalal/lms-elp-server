import { z } from "zod";

const createQuestionZodSchema = z.object({
  body: z.object({
    question: z.string({
      required_error: "Question is required!",
    }),
    options: z.array(z.object({})).optional(),
    correct_answer: z.string({}).optional(),
    exam_id: z.string({
      required_error: "Exam id is required",
    }),
    exam_type: z.enum(["0", "1"] as const, {
      required_error: "Exam type is required!",
    }),
    mark: z.number({}).default(1).optional(),
  }),
});

const updateQuestionZodSchema = z.object({
  body: z.object({
    question: z.string({}).optional(),
    options: z.string({}).optional(),
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
