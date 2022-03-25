import { RequestHandler, Request, Response, NextFunction } from "express";
import { Storage } from "../../storage/model/storage.model";
import { Nullable } from "../../type/nullable.type";
import { invalidRequestResponseFactory } from "../factory/invalid-request-response-factory";

export enum ShouldEnsureEntityExists {
  IfIdPresent,
  Always,
  Never,
}

export const entityExistsValidator = <T>(
  storage: Storage<T>,
  options: {
    idBodyProperty?: string;
    ensureExists?: ShouldEnsureEntityExists;
    entityName?: string;
  } = {}
): RequestHandler => {
  const {
    idBodyProperty,
    ensureExists: ensureExistsOption,
    entityName,
  } = options;
  const ensureExists = ensureExistsOption ?? ShouldEnsureEntityExists.Always;

  return async (req: Request, res: Response, next: NextFunction) => {
    let id: Nullable<number> = null;
    if (!!idBodyProperty) {
      id = req.body[idBodyProperty];
    }

    if (
      ensureExists === ShouldEnsureEntityExists.Always ||
      (ensureExists === ShouldEnsureEntityExists.IfIdPresent && !!id)
    ) {
      if (!id) {
        const invalidResponse = invalidRequestResponseFactory(
          `No ${entityName} ID provided`
        );
        res.status(invalidResponse.status).send(invalidResponse.body);
        return;
      }

      const author = await storage.get(id);
      if (!author) {
        const invalidResponse = invalidRequestResponseFactory(
          `Invalid ${entityName}`
        );
        res.status(invalidResponse.status).send(invalidResponse.body);
        return;
      }
    }

    next();
  };
};
