import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { blogPostStorage } from "../../storage";
import {
  blogPostValidator,
  EnsureAuthorExistsOption,
} from "./validator/blog-post-validator";
import { idValidator } from "../validator/id-validator";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.patch(
      "/blogs/:id",
      bodyParser.json(),
      idValidator({ paramName: "id" }),
      blogPostValidator({
        partial: true,
        ensureAuthorExists: EnsureAuthorExistsOption.IfIdPresent,
      }),
      updateBlogPost
    );
  },
};

const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  const blogPostId = parseInt(req.params.id);
  let blogPost = await blogPostStorage.get(blogPostId);
  if (!blogPost) {
    res.status(404).send();
  }

  blogPost = { ...blogPost, ...req.body };

  const id = await blogPostStorage.set(blogPost!, blogPostId);

  res.status(200).send({ id });
};
