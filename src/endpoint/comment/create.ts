import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Nullable } from "../../type/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import storage from "../../storage";
import { isComment } from "../../model/comment.model";
import { Comment } from "../../model/comment.model";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.post("/blogs/:blogId/comments", bodyParser.json(), createComment);
    app.post("/comments/:commentId/replies", bodyParser.json(), createComment);
  },
};

const createComment = async (req: Request, res: Response): Promise<void> => {
  const invalidResponse = await validateReq(req);
  if (!!invalidResponse) {
    res.status(invalidResponse.status).send(invalidResponse.body);
    return;
  }

  const blogId = req.params.blogId;
  const parentCommentId = req.params.commentId;
  const comment = req.body as Comment;
  if (!!blogId) {
    comment.parentPostId = parseInt(blogId);
  }
  if (!!parentCommentId) {
    comment.parentCommentId = parseInt(parentCommentId);
  }
  const id = await storage.setComment(comment);

  res.status(200).send({ id });
};

const validateReq = async (
  req: Request
): Promise<Nullable<InvalidRequestResponse>> => {
  let invalidResponse = await validateReqParams(req.params);
  if (!!invalidResponse) return invalidResponse;

  invalidResponse = await validateReqBody(req.body);
  if (!!invalidResponse) return invalidResponse;

  return null;
};

const validateReqParams = async (
  params: any
): Promise<Nullable<InvalidRequestResponse>> => {
  let id = params.blogId;
  if (!id) {
    id = params.commentId;
  }

  if (!id) {
    return {
      status: 400,
      body: { reason: "Either blog post ID or comment ID is required" },
    };
  }

  if (parseInt(id) == NaN) {
    return { status: 400, body: { reason: "ID must be numeric" } };
  }

  let blogId = params.blogId;
  if (!!blogId) {
    blogId = parseInt(blogId);
    const post = await storage.getBlogPost(blogId);
    if (!post) return { status: 400, body: { reason: "Invalid parent post" } };
  }

  let commentId = params.commentId;
  if (!!commentId) {
    commentId = parseInt(commentId);
    const post = await storage.getComment(commentId);
    if (!post)
      return { status: 400, body: { reason: "Invalid parent comment" } };
  }

  return null;
};

const validateReqBody = async (
  body: any
): Promise<Nullable<InvalidRequestResponse>> => {
  if (!isComment(body, { noId: true, partial: false })) {
    return { status: 400, body: { reason: "Invalid body format" } };
  }

  const authorId = body.authorId;
  if (!!authorId) {
    const author = await storage.getUser(authorId);
    if (!author) return { status: 400, body: { reason: "Invalid author" } };
  }

  return null;
};
