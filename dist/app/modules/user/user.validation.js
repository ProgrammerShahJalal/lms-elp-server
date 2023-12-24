"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const registerUserZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        contact_no: zod_1.z.string({}).optional(),
        email: zod_1.z.string({}).optional(),
        password: zod_1.z.string({ required_error: "Password is required!" }),
    }),
})
    .refine((data) => {
    if (!data.body.contact_no && !data.body.email) {
        throw new Error("Either contact_no or email is required!");
    }
    return true;
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email_or_contact: zod_1.z.string({}).optional(),
        password: zod_1.z.string({ required_error: "Password is required!" }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({}).optional(),
        contact_no: zod_1.z.string({}).optional(),
        email: zod_1.z.string({}).optional(),
    }),
});
exports.UserValidation = {
    registerUserZodSchema,
    loginUserZodSchema,
    updateUserZodSchema,
};
