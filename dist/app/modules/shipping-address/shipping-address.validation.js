"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddressValidation = void 0;
const zod_1 = require("zod");
const createShippingAddressZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "User id is required!",
        }),
        division: zod_1.z.string({
            required_error: "Division is required!",
        }),
        district: zod_1.z.string({
            required_error: "District is required!",
        }),
        upazilla: zod_1.z.string({
            required_error: "Upazilla is required!",
        }),
        address: zod_1.z.string({
            required_error: "Address is required!",
        }),
        contact_no: zod_1.z.string({
            required_error: "Contact number is required!",
        }),
        is_default: zod_1.z
            .boolean({
            required_error: "Contact number is required!",
        })
            .default(true),
        billing_name: zod_1.z.string({
            required_error: "Billing name is required!",
        }),
    }),
});
const updateShippingAddressZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({}).optional(),
        division: zod_1.z.string({}).optional(),
        district: zod_1.z.string({}).optional(),
        upazilla: zod_1.z.string({}).optional(),
        address: zod_1.z.string({}).optional(),
        contact_no: zod_1.z.string({}).optional(),
        is_default: zod_1.z.boolean({}).optional(),
        billing_name: zod_1.z.string({}).optional(),
    }),
});
exports.ShippingAddressValidation = {
    createShippingAddressZodSchema,
    updateShippingAddressZodSchema,
};
