import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod/v3";

export const validateSchema = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next()
        } catch (error) {
            res.status(400).json(error);
        }
    }
}