import { NextFunction, Request, RequestHandler, Response } from "express";
import { invalidRequestResponseFactory } from "../../factory/invalid-request-response-factory";

export const userIdValidator = (
  options: { paramName?: string } = {}
): RequestHandler => {
  const { paramName } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    if (!!paramName) {
      const params = req.params;
      const idParam = params[paramName];

      if (!idParam) {
        const invalidResponse = invalidRequestResponseFactory("ID is required");
        res.status(invalidResponse.status).send(invalidResponse.body);
        return;
      }

      const id = parseInt(idParam);
      if (isNaN(id)) {
        const invalidResponse = invalidRequestResponseFactory(
          "ID must be an integer"
        );
        res.status(invalidResponse.status).send(invalidResponse.body);
        return;
      }
    }

    next();
  };
};
