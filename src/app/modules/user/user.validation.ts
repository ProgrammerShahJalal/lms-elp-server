import { z } from "zod";

const registerUserZodSchema = z
  .object({
    body: z.object({
      name: z
        .string({
          required_error: "Name is required!",
        })
        .trim(),
      contact_no: z.string({}).trim().optional(),
      email: z.string({}).trim().optional(),
      password: z.string({ required_error: "Password is required!" }),
    }),
  })
  .refine((data) => {
    if (!data.body.contact_no && !data.body.email) {
      throw new Error("Either contact_no or email is required!");
    }
    return true;
  });

const loginUserZodSchema = z.object({
  body: z.object({
    email_or_contact: z.string({}).trim().optional(),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string({}).trim().optional(),
    contact_no: z.string({}).trim().optional(),
    email: z.string({}).trim().optional(),
  }),
});

export const UserValidation = {
  registerUserZodSchema,
  loginUserZodSchema,
  updateUserZodSchema,
};
