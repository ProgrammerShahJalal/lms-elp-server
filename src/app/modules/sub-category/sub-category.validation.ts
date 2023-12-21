import { z } from "zod";

const createSubCategorySchema = z.object({
  name: z.string({
    required_error: "Sub Category name is required!",
  }),
  icon: z.string({}).optional(),
  category_id: z.string({
    required_error: "Category id is required!",
  }),
});

const updateSubCategoryZodSchema = z.object({
  name: z.string({}).optional(),
  icon: z.string({}).optional(),
  category_id: z.string({}).optional(),
});

export const SubCategoryValidation = {
  createSubCategorySchema,
  updateSubCategoryZodSchema,
};
