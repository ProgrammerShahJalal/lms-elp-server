import { z } from "zod";

const addBookZodSchema = z.object({
  name: z.string({
    required_error: "Exam name is required!",
  }),
  writer: z.string({}).optional(),
  price: z.number({}).optional(),
  discount_price: z.number({}).optional(),
  cover_page: z.string({}).optional(),
  format: z.enum(["pdf", "hard copy"]).refine(
    (value) => {
      return value === "pdf" || value === "hard copy";
    },
    {
      message: "Format type must be either 'pdf' or 'hard copy'",
    }
  ),
  pdf_link: z.string({}).optional(),
  course_id: z.string({}).optional(),
});

const updateBookZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    writer: z.string({}).optional(),
    price: z.number({}).optional(),
    discount_price: z.number({}).optional(),
    cover_page: z.string({}).optional(),
    format: z
      .enum(["pdf", "hard copy"])
      .refine(
        (value) => {
          return value === "pdf" || value === "hard copy";
        },
        {
          message: "Format type must be either 'pdf' or 'hard copy'",
        }
      )
      .optional(),
    pdf_link: z.string({}).optional(),
    course_id: z.string({}),
  }),
});

export const BookValidation = {
  addBookZodSchema,
  updateBookZodSchema,
};
