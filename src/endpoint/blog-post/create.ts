import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { BlogPost } from "../../model/blog-post.model";
import { blogPostStorage } from "../../storage";
import {
  blogPostValidator,
  EnsureAuthorExistsOption,
} from "./validator/blog-post-validator";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.post(
      "/blogs",
      bodyParser.json(),
      blogPostValidator({
        ensureAuthorExists: EnsureAuthorExistsOption.Always,
      }),
      createBlogPost
    );
  },
};

const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  const blogPost = req.body as BlogPost;
  const id = await blogPostStorage.set(blogPost, null);

  res.status(200).send({ id });
};
