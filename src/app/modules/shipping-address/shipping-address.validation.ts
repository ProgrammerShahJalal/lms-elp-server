import { z } from "zod";

const createShippingAddressZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User id is required!",
    }),
    division: z.string({
      required_error: "Division is required!",
    }),
    outside_dhaka: z.boolean({
      required_error: "Is location outside Dhaka required!",
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
    contact_no: z.string({
      required_error: "Contact number is required!",
    }),
    is_default: z
      .boolean({
        required_error: "Contact number is required!",
      })
      .default(true),
    billing_name: z.string({
      required_error: "Billing name is required!",
    }),
  }),
});

const updateShippingAddressZodSchema = z.object({
  body: z.object({
    userId: z.string({}).optional(),
    outside_dhaka: z.boolean({}).optional(),
    division: z.string({}).optional(),
    district: z.string({}).optional(),
    upazilla: z.string({}).optional(),
    address: z.string({}).optional(),
    contact_no: z.string({}).optional(),
    is_default: z.boolean({}).optional(),
    billing_name: z.string({}).optional(),
  }),
});

export const ShippingAddressValidation = {
  createShippingAddressZodSchema,
  updateShippingAddressZodSchema,
};
