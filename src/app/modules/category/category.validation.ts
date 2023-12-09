import { z } from "zod";

const createCategorySchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Category name is required!",
    }),
    icon_link: z.string({}).optional(),
  }),
});

const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    icon_link: z.string({}).optional(),
  }),
});

export const CategoryValidation = {
  createCategorySchema,
  updateCategoryZodSchema,
};
