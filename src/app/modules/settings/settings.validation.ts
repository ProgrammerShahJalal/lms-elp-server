import { z } from "zod";

const addSettingsZodSchema = z.object({
  body: z.object({
    key: z.string({
      required_error: "Settings key is required!",
    }),
    value: z.any({
      required_error: "Settings value is required!",
    }),
  }),
});

const updateSettingsZodSchema = z.object({
  body: z.object({
    key: z.string({}).optional(),
    value: z.any({}).optional(),
  }),
});

export const SettingsValidation = {
  addSettingsZodSchema,
  updateSettingsZodSchema,
};
