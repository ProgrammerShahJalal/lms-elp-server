import { z } from "zod";

const createCourseSchema = z.object({
  name: z.string({
    required_error: "Course name is required!",
  }),
  membership_type: z.enum(["free", "paid"]).refine(
    (value) => {
      return value === "free" || value === "paid";
    },
    {
      message: "Membership type must be either 'free' or 'paid'",
    }
  ),
  sub_category_id: z.string({
    required_error: "Sub category id is required!",
  }),
  description: z.string({
    required_error: "Description is required!",
  }),
  banner: z.string({}).optional(),
  syllabus: z.string({}).optional(),
  study_materials: z.string({}).optional(),
});

const updateCourseZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    membership_type: z.enum(["free", "paid"]).optional(),
    sub_category_id: z.string({}).optional(),
    description: z.string({}).optional(),
    banner: z.string({}).optional(),
    syllabus: z.string({}).optional(),
    study_materials: z.string({}).optional(),
  }),
});

export const CourseValidation = {
  createCourseSchema,
  updateCourseZodSchema,
};
