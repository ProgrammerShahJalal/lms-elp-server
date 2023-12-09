import { z } from "zod";
const createExamZodSchema = z.object({
  body: z.object({
    name: z.string({
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
    cost: z.number({}),
    is_active: z.boolean({ required_error: "Is active is required!" }),
    is_paid: z.boolean({ required_error: "Is paid is required!" }),
    course_id: z.string({}),
  }),
});

const updateExamZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    description: z.string({}).optional(),
    total_marks: z.number({}).optional(),
    duration_in_minutes: z.number({}).optional(),
    cost: z.number({}).optional(),
    is_active: z.boolean({}).optional(),
    is_paid: z.boolean({}).optional(),
    course_id: z.string({}).optional(),
  }),
});

export const ExamValidation = {
  createExamZodSchema,
  updateExamZodSchema,
};
