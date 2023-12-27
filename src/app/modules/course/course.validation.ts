import { z } from "zod";

const createCourseSchema = z.object({
  title: z.string({
    required_error: "Course name is required!",
  }),
  author: z.string({}).optional(),
  membership_type: z.enum(["0", "1"]).refine(
    (value) => {
      return value === "0" || value === "1";
    },
    {
      message: "Membership type must be either '0'(free) or '1'(paid)",
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
  title: z.string({}).optional(),
  author: z.string({}).optional(),
  membership_type: z.enum(["0", "1"]).optional(),
  sub_category_id: z.string({}).optional(),
  description: z.string({}).optional(),
  banner: z.string({}).optional(),
  syllabus: z.string({}).optional(),
  study_materials: z.string({}).optional(),
});

export const CourseValidation = {
  createCourseSchema,
  updateCourseZodSchema,
};
