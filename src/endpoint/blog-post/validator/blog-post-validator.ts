import { NextFunction, Request, RequestHandler, Response } from "express";
import { isBlogPost } from "../../../model/blog-post.model";
import { invalidRequestResponseFactory } from "../../factory/invalid-request-response-factory";
import { userExistsValidator } from "../../user/validator/user-exists-validator";
import { promisifyMiddleware } from "../../utility/promisify-middleware";
import { ShouldEnsureEntityExists } from "../../validator/entity-exists-validator";

export const blogPostValidator = (
  options: {
    partial?: boolean;
    ensureAuthorExists?: ShouldEnsureEntityExists;
  } = {}
): RequestHandler => {
  const {
    partial: partialOption,
    ensureAuthorExists: ensureAuthorExistsOption,
  } = options;
  const partial = partialOption ?? false;
  const ensureAuthorExists =
    ensureAuthorExistsOption ?? ShouldEnsureEntityExists.Always;

  return async (req: Request, res: Response, next: NextFunction) => {
    if (!isBlogPost(req.body, { partial })) {
      const invalidResponse = invalidRequestResponseFactory(
        "Request body must be a valid BlogPost object"
      );
      res.status(invalidResponse.status).send(invalidResponse.body);
      return;
    }

    const authorExistsValidator = userExistsValidator({
      idBodyProperty: "authorId",
      ensureUserExists: ensureAuthorExists,
    });
    await promisifyMiddleware(authorExistsValidator, req, res);

    next();
  };
};
