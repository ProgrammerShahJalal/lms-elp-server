import { z } from "zod";

const registerUserZodSchema = z
  .object({
    body: z.object({
      name: z.string({
        required_error: "Name is required!",
      }),
      contact_no: z.string({}).optional(),
      email: z.string({}).optional(),
      password: z.string({ required_error: "Password is required!" }),
    }),
  })
  .refine((data) => {
    if (!data.body.contact_no && !data.body.email) {
      throw new Error("Either contact_no or email is required!");
    }
    return true;
  });

const loginUserZodSchema = z
  .object({
    body: z.object({
      contact_no: z.string({}).optional(),
      email: z.string({}).optional(),
      password: z.string({ required_error: "Password is required!" }),
    }),
  })
  .refine((data) => {
    if (!data.body.contact_no && !data.body.email) {
      throw new Error("Either contact_no or email is required!");
    }
    return true;
  });

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    contact_no: z.string({}).optional(),
    email: z.string({}).optional(),
  }),
});

export const UserValidation = {
  registerUserZodSchema,
  loginUserZodSchema,
  updateUserZodSchema,
};
