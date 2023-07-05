import { z } from "zod";

const createTaskSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    description: z
        .string({
            required_error: "Description must be string",
        }),
    date: z.string().datetime().optional(),
});

export { createTaskSchema };
