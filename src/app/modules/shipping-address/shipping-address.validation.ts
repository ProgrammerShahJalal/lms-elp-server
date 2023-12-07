import { z } from "zod";

const createShippingAddressZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User id is required!",
    }),
    district: z.string({
      required_error: "District is required!",
    }),
    upazilla: z.string({
      required_error: "Upazilla is required!",
    }),
    address: z.string({
      required_error: "Address is required!",
    }),
  }),
});

const updateShippingAddressZodSchema = z.object({
  body: z.object({
    userId: z.string({}).optional(),
    district: z.string({}).optional(),
    upazilla: z.string({}).optional(),
    address: z.string({}).optional(),
  }),
});

export const ShippingAddressValidation = {
  createShippingAddressZodSchema,
  updateShippingAddressZodSchema,
};
