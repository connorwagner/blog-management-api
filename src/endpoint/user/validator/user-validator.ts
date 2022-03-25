import { NextFunction, Request, RequestHandler, Response } from "express";
import { isUser } from "../../../model/user.model";
import { invalidRequestResponseFactory } from "../../factory/invalid-request-response-factory";

export const userValidator = (
  options: {
    partial?: boolean;
  } = {}
): RequestHandler => {
  const { partial: partialOption } = options;
  const partial = partialOption ?? false;

  return (req: Request, res: Response, next: NextFunction) => {
    if (!isUser(req.body, { partial })) {
      const invalidResponse = invalidRequestResponseFactory(
        "Request body must be a valid User object"
      );
      res.status(invalidResponse.status).send(invalidResponse.body);
      return;
    }

    next();
  };
};
