import { z } from "zod";

const createNoticeSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Notice title is required!",
    }),
    description: z.string({
      required_error: "Notice description is required!",
    }),
  }),
});

const updateNoticeZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    description: z.string({}).optional(),
  }),
});

export const NoticeValidation = {
  createNoticeSchema,
  updateNoticeZodSchema,
};
