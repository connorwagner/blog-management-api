import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Nullable } from "../../type/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import storage from "../../storage";
import { isComment } from "../../model/comment.model";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.patch("/comments/:id", bodyParser.json(), updateBlogPost);
  },
};

const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  const invalidResponse = await validateReq(req);
  if (!!invalidResponse) {
    res.status(invalidResponse.status).send(invalidResponse.body);
    return;
  }

  const commentId = parseInt(req.params.id);
  let comment = await storage.getComment(commentId);
  if (!comment) {
    res.status(404).send();
  }
  comment = { ...comment, ...req.body };

  const id = await storage.setComment(comment!, commentId);

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
  if (!params.id) {
    return {
      status: 400,
      body: { reason: "Either blog post ID or comment ID is required" },
    };
  }

  if (parseInt(params.id) == NaN) {
    return { status: 400, body: { reason: "ID must be numeric" } };
  }

  return null;
};

const validateReqBody = async (
  body: any
): Promise<Nullable<InvalidRequestResponse>> => {
  if (!isComment(body, { partial: true, noId: true })) {
    return { status: 400, body: { reason: "Invalid body format" } };
  }

  const authorId = body.authorId;
  if (!!authorId) {
    const author = await storage.getUser(authorId);
    if (!author) return { status: 400, body: { reason: "Invalid author" } };
  }

  const postId = body.parentPostId;
  if (!!postId) {
    const post = await storage.getBlogPost(postId);
    if (!post) return { status: 400, body: { reason: "Invalid parent post" } };
  }

  const commentId = body.parentCommentId;
  if (!!commentId) {
    const post = await storage.getComment(commentId);
    if (!post)
      return { status: 400, body: { reason: "Invalid parent comment" } };
  }

  return null;
};
