import { NextFunction, Request, RequestHandler, Response } from "express";
import { isBlogPost } from "../../../model/blog-post.model";
import { userStorage } from "../../../storage";
import { invalidRequestResponseFactory } from "../../factory/invalid-request-response-factory";

export const blogPostValidator = (
  options: {
    partial?: boolean;
    ensureAuthorExists?: EnsureAuthorExistsOption;
  } = {}
): RequestHandler => {
  const {
    partial: partialOption,
    ensureAuthorExists: ensureAuthorExistsOption,
  } = options;
  const partial = partialOption ?? false;
  const ensureAuthorExists = ensureAuthorExistsOption ?? false;

  return async (req: Request, res: Response, next: NextFunction) => {
    if (!isBlogPost(req.body, { partial })) {
      const invalidResponse = invalidRequestResponseFactory(
        "Request body must be a valid BlogPost object"
      );
      res.status(invalidResponse.status).send(invalidResponse.body);
      return;
    }

    const authorId = req.body.authorId;
    if (
      ensureAuthorExists === EnsureAuthorExistsOption.Always ||
      (ensureAuthorExists === EnsureAuthorExistsOption.IfIdPresent &&
        !!authorId)
    ) {
      const author = await userStorage.get(authorId);
      if (!author) {
        const invalidResponse = invalidRequestResponseFactory(
          "Author is not a valid user"
        );
        res.status(invalidResponse.status).send(invalidResponse.body);
        return;
      }
    }

    next();
  };
};

export enum EnsureAuthorExistsOption {
  IfIdPresent,
  Always,
  Never,
}
