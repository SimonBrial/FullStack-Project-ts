import { z } from "zod";

const registerSchema = z.object({
    userName: z.string({
        required_error: "User name must be provided",
    }),
    email: z
        .string({
            required_error: "Email must be provided",
        })
        .email({
            message: "Invalid email",
        }),
    password: z
        .string({
            required_error: "Password must be provided",
        })
        .min(6, {
            message: "Password must be at least 6 characters",
        }),
});

const loginShema = z.object({
    email: z
        .string({
            required_error: "Email must be provided",
        })
        .email({
            message: "Email is not valid",
        }),
    password: z
        .string({
            required_error: "Invalid Password",
        })
        .min(6, {
            message: "Password must be at least 6 characters",
        }),
});

export { registerSchema, loginShema };
