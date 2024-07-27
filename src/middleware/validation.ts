import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { fromError } from "zod-validation-error";

const validateData = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      //console.log(fromError(result.error).toString());
      return res.status(400).json({
        success: false,
        message: fromError(result.error).toString(),
      });
    }
    next();
  };
};

export default validateData;
