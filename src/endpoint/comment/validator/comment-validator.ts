import { NextFunction, Request, RequestHandler, Response } from "express";
import { isComment } from "../../../model/comment.model";
import { blogPostExistsValidator } from "../../blog-post/validator/blog-post-exists-validator";
import { invalidRequestResponseFactory } from "../../factory/invalid-request-response-factory";
import { userExistsValidator } from "../../user/validator/user-exists-validator";
import { promisifyMiddleware } from "../../utility/promisify-middleware";
import { ShouldEnsureEntityExists } from "../../validator/entity-exists-validator";
import { commentExistsValidator } from "./comment-exists-validator";

export const commentValidator = (
  options: {
    partial?: boolean;
    noId?: boolean;
    ensureAuthorExists?: ShouldEnsureEntityExists;
    ensureBlogPostExists?: ShouldEnsureEntityExists;
    ensureParentCommentExists?: ShouldEnsureEntityExists;
  } = {}
): RequestHandler => {
  const {
    partial: partialOption,
    noId: noIdOption,
    ensureAuthorExists: ensureAuthorExistsOption,
    ensureBlogPostExists: ensureBlogPostExistsOption,
    ensureParentCommentExists: ensureParentCommentExistsOption,
  } = options;
  const partial = partialOption ?? false;
  const noId = noIdOption ?? false;
  const ensureAuthorExists =
    ensureAuthorExistsOption ?? ShouldEnsureEntityExists.Always;
  const ensureBlogPostExists =
    ensureBlogPostExistsOption ?? ShouldEnsureEntityExists.IfIdPresent;
  const ensureParentCommentExists =
    ensureParentCommentExistsOption ?? ShouldEnsureEntityExists.IfIdPresent;

  return async (req: Request, res: Response, next: NextFunction) => {
    if (!isComment(req.body, { partial, noId })) {
      const invalidResponse = invalidRequestResponseFactory(
        "Request body must be a valid Comment object"
      );
      res.status(invalidResponse.status).send(invalidResponse.body);
      return;
    }

    const authorExistsValidator = userExistsValidator({
      idBodyProperty: "authorId",
      ensureUserExists: ensureAuthorExists,
    });
    await promisifyMiddleware(authorExistsValidator, req, res);

    const postExistsValidator = blogPostExistsValidator({
      idBodyProperty: "parentPostId",
      ensureBlogPostExists,
    });
    await promisifyMiddleware(postExistsValidator, req, res);

    const parentCommentExistsValidator = commentExistsValidator({
      idBodyProperty: "parentCommentId",
      ensureCommentExists: ensureParentCommentExists,
    });
    await promisifyMiddleware(parentCommentExistsValidator, req, res);

    next();
  };
};
