import { z } from "zod";

const createExamZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Exam name is required!",
    }),
    description: z.string({
      required_error: "Description is required!",
    }),
    total_marks: z.number({
      required_error: "Total marks is required!",
    }),
    duration_in_minutes: z.number({
      required_error: "Duration in minutes is required!",
    }),
    fee: z.number({}),
    is_active: z.boolean({ required_error: "Is active is required!" }),
    exam_type: z.enum(["0", "1"] as const, {
      required_error: "Exam type is required!",
    }),
    course_id: z.string({}),
  }),
});

const updateExamZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    description: z.string({}).optional(),
    total_marks: z.number({}).optional(),
    duration_in_minutes: z.number({}).optional(),
    fee: z.number({}).optional(),
    is_active: z.boolean({}).optional(),
    exam_type: z.string({}).optional(),
    course_id: z.string({}).optional(),
  }),
});

export const ExamValidation = {
  createExamZodSchema,
  updateExamZodSchema,
};
