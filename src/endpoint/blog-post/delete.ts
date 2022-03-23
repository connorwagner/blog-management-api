import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import { Nullable } from "../../types/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import storage from "../../storage";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.delete("/blogs/:id", deleteBlogPost);
  },
};

const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  const invalidResponse = validateReqParams(req.params);
  if (!!invalidResponse) {
    res.status(invalidResponse.status).send(invalidResponse.body);
    return;
  }

  const blogPostId = parseInt(req.params.id);
  const blogPost = await storage.getBlogPost(blogPostId);

  if (!blogPost) {
    res.status(404).send();
    return;
  }

  await storage.deleteBlogPost(blogPostId);

  res.status(200).send(blogPost);
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