import Joi from "joi";
import { Request, Response, NextFunction, response } from "express";

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "failed",
        code: "400",
        name: "Bad_Request",
        error: {
          message: error.details[0].message,
        },
      });
    }
    next();
  };
};

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({
        status: "failed",
        code: "400",
        name: "Bad_Request",
        error: {
          message: error.details[0].message,
        },
      });
    }
    next();
  };
};
