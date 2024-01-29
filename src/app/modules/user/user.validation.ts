import { z } from "zod";
import { adminPermissions } from "./user.constants";

const registerUserZodSchema = z
  .object({
    body: z.object({
      name: z
        .string({
          required_error: "Name is required!",
        })
        .trim(),
      contact_no: z.string({}).trim(),
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

type AdminPermission = (typeof adminPermissions)[number];
const giveOrRemovePermissionOfAdmin = z.object({
  body: z.object({
    user_id: z.string({ required_error: "User id of the admin is required!" }),
    permission: z.string().refine(
      (value): value is AdminPermission => {
        return adminPermissions.includes(value as AdminPermission);
      },
      { message: "Invalid permission" }
    ),
  }),
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
  giveOrRemovePermissionOfAdmin,
  loginUserZodSchema,
  updateUserZodSchema,
};
