import { z } from "zod";
const createExamZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Exam name is required!",
    }),
    description: z.string({
      required_error: "Description is required!",
    }),
    total_marks: z.string({
      required_error: "Total marks is required!",
    }),
    duration: z.string({
      required_error: "Duration is required!",
    }),
    cost: z.string({}),
    is_active: z.boolean({ required_error: "Is active is required!" }),
    is_paid: z.boolean({ required_error: "Is paid is required!" }),
    course_id: z.string({}),
  }),
});

const updateExamZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    description: z.string({}).optional(),
    total_marks: z.string({}).optional(),
    duration: z.string({}).optional(),
    cost: z.string({}).optional(),
    is_active: z.boolean({}).optional(),
    is_paid: z.boolean({}).optional(),
    course_id: z.string({}).optional(),
  }),
});

export const ExamValidation = {
  createExamZodSchema,
  updateExamZodSchema,
};
