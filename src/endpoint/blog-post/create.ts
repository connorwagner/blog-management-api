import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Nullable } from "../../types/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import { BlogPost, isBlogPost } from "../../model/blog-post.model";
import storage from "../../storage";

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

  await storage.setBlogPost(req.body as BlogPost);

  res.status(200).send();
};

const validateReqBody = (body: any): Nullable<InvalidRequestResponse> => {
  if (!isBlogPost(body)) {
    return { status: 400, body: { reason: "Invalid blog post format" } };
  }

  return null;
};
