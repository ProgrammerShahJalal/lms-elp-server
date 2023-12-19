import { z } from "zod";

const createExamResultZodSchema = z.object({
  body: z.object({
    user_id: z.string(),
    exam_id: z.string(),
    exam_type: z.enum(["0", "1"]),
    answer: z.string({}),
    total_marks: z.number(),
    total_correct_answer: z.number().default(0),
    total_wrong_answer: z.number().default(0),
    isApproved: z.boolean().default(false),
  }),
});

const updateExamResultZodSchema = z.object({
  body: z.object({
    user_id: z.string({}).optional(),
    exam_id: z.string({}).optional(),
    answer: z.string({}).optional(),
    question_mark: z
      .object({
        question_id: z.string().optional(),
        mark_obtained: z.number().optional(),
      })
      .optional(),
    total_marks: z.number().optional(),
    total_correct_answer: z.number().optional(),
    total_wrong_answer: z.number().optional(),
    isApproved: z.boolean().optional(),
  }),
});

const questionMarkSchema = z.object({
  question_id: z.string(),
  mark_obtained: z.number(),
});

export const giveQuestionMarkZodSchema = z.object({
  exam_id: z.string(),
  user_id: z.string(),
  marks: z.array(questionMarkSchema),
});

export const ExamResultValidation = {
  createExamResultZodSchema,
  updateExamResultZodSchema,
  giveQuestionMarkZodSchema,
};
