import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Nullable } from "../../type/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import { BlogPost, isBlogPost } from "../../model/blog-post.model";
import { blogPostStorage, userStorage } from "../../storage";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.post("/blogs", bodyParser.json(), createBlogPost);
  },
};

const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  const invalidResponse = await validateReqBody(req.body);
  if (!!invalidResponse) {
    res.status(invalidResponse.status).send(invalidResponse.body);
    return;
  }

  const blogPost = req.body as BlogPost;
  const id = await blogPostStorage.set(blogPost, null);

  res.status(200).send({ id });
};

const validateReqBody = async (
  body: any
): Promise<Nullable<InvalidRequestResponse>> => {
  if (!isBlogPost(body))
    return { status: 400, body: { reason: "Invalid body format" } };

  const authorId = body.authorId;
  const author = await userStorage.get(authorId);
  if (!author) return { status: 400, body: { reason: "Invalid author" } };

  return null;
};
