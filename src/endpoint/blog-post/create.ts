import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Nullable } from "../../types/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import storage from "../../storage";
import { BlogPost, isBlogPost } from "../../model/blog-post.model";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.post("/blogs", bodyParser.json(), createBlogPost);
  },
};

const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  const invalidResponse = validateReqBody(req.body);
  if (!!invalidResponse) {
    res.status(invalidResponse.status).send(invalidResponse.body);
    return;
  }

  const blogPost = req.body as BlogPost;
  const id = await storage.setBlogPost(blogPost);

  res.status(200).send({ id });
};

const validateReqBody = (body: any): Nullable<InvalidRequestResponse> => {
  if (!isBlogPost(body)) {
    return { status: 400, body: { reason: "Invalid body format" } };
  }

  return null;
};
