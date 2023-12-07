import { z } from "zod";

const createQuizQuestionZodSchema = z.object({
  body: z.object({
    question: z.string({
      required_error: "Question is required!",
    }),
    a: z.string({
      required_error: "Option a is required!",
    }),
    b: z.string({
      required_error: "Option b is required!",
    }),
    c: z.string({
      required_error: "Option c is required!",
    }),
    d: z.string({
      required_error: "Option d is required!",
    }),
    correct_answer: z.string({
      required_error: "Correct answer is required!",
    }),
    quiz_id: z.string({}).optional(),
  }),
});

const updateQuizQuestionZodSchema = z.object({
  body: z.object({
    question: z.string({}).optional(),
    a: z.string({}).optional(),
    b: z.string({}).optional(),
    c: z.string({}).optional(),
    d: z.string({}).optional(),
    correct_answer: z
      .string({
        required_error: "Correct answer is required!",
      })
      .optional(),
    quiz_id: z.string({}).optional(),
  }),
});

export const QuizQuestionValidation = {
  createQuizQuestionZodSchema,
  updateQuizQuestionZodSchema,
};
