import { z } from "zod";

const createSubCategorySchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Sub Category name is required!",
    }),
    icon_link: z.string({}).optional(),
    category_id: z.string({
      required_error: "Category id is required!",
    }),
  }),
});

const updateSubCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    icon_link: z.string({}).optional(),
    category_id: z.string({}).optional(),
  }),
});

export const SubCategoryValidation = {
  createSubCategorySchema,
  updateSubCategoryZodSchema,
};
