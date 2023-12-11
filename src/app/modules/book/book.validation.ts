import { z } from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Exam name is required!",
    }),
    price: z.number({}).optional(),
    discount_price: z.number({}).optional(),
    cover_page: z.string({}).optional(),
    format: z.string({
      required_error: "Format(pdf/hard copy) is required!",
    }),
    pdf_link: z.string({}).optional(),
    course_id: z.string({}),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    price: z.number({}).optional(),
    discount_price: z.number({}).optional(),
    cover_page: z.string({}).optional(),
    format: z.string({}).optional(),
    pdf_link: z.string({}).optional(),
    course_id: z.string({}),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
