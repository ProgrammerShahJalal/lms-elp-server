import { z } from "zod";

const createUserExamQuestionMarkZodSchema = z.object({
  body: z.object({
    user_id: z.string({
      required_error: "User id is required",
    }),
    exam_id: z.string({
      required_error: "Exam id is required",
    }),
    question_id: z.string({
      required_error: "Question id is required",
    }),
    mark_obtained: z.number({
      required_error: "Mark obtained needed to be given!",
    }),
  }),
});

const updateUserExamQuestionMarkZodSchema = z.object({
  body: z.object({
    user_id: z.string({}).optional(),
    exam_id: z.string({}).optional(),
    question_id: z.string({}).optional(),
    mark_obtained: z.number({}).optional(),
  }),
});

export const UserExamQuestionMarkValidation = {
  createUserExamQuestionMarkZodSchema,
  updateUserExamQuestionMarkZodSchema,
};
