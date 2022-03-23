import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Nullable } from "../../types/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import storage from "../../storage";
import { isBlogPost } from "../../model/blog-post.model";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.patch("/blogs/:id", bodyParser.json(), updateBlogPost);
  },
};

const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  const invalidResponse = validateReq(req);
  if (!!invalidResponse) {
    res.status(invalidResponse.status).send(invalidResponse.body);
    return;
  }

  const blogPostId = parseInt(req.params.id);
  let blogPost = await storage.getBlogPost(blogPostId);
  if (!blogPost) {
    res.status(404).send();
  }
  blogPost = { ...blogPost, ...req.body };

  const id = await storage.setBlogPost(blogPost!, blogPostId);

  res.status(200).send({ id });
};

const validateReq = (req: Request): Nullable<InvalidRequestResponse> => {
  let invalidResponse = validateReqParams(req.params);
  if (!!invalidResponse) return invalidResponse;

  invalidResponse = validateReqBody(req.body);
  if (!!invalidResponse) return invalidResponse;

  return null;
};

const validateReqParams = (params: any): Nullable<InvalidRequestResponse> => {
  if (!params.id) {
    return { status: 400, body: { reason: "Blog post ID is required" } };
  }

  if (parseInt(params.id) == NaN) {
    return { status: 400, body: { reason: "Blog post ID must be numeric" } };
  }

  return null;
};

const validateReqBody = (body: any): Nullable<InvalidRequestResponse> => {
  if (!isBlogPost(body, { partial: true })) {
    return { status: 400, body: { reason: "Invalid body format" } };
  }

  return null;
};
