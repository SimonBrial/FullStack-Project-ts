import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validateSchema =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err: any) {
            return res.status(400).json({
                message: err.errors.map((error: any) => error.message),
            });
        }
    };

export { validateSchema };
