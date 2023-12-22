import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string({
    required_error: "Category name is required!",
  }),
  icon: z.string({}).optional(),
});

const updateCategoryZodSchema = z.object({
  name: z.string({}).optional(),
  icon: z.string({}).optional(),
});

export const CategoryValidation = {
  createCategorySchema,
  updateCategoryZodSchema,
};
