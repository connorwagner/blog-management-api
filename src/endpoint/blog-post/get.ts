import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import { blogPostStorage } from "../../storage";
import { idValidator } from "../validator/id-validator";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.get("/blogs/:id", idValidator({ paramName: "id" }), getBlogPost);
  },
};

const getBlogPost = async (req: Request, res: Response): Promise<void> => {
  const blogPostId = parseInt(req.params.id);
  const blogPost = await blogPostStorage.get(blogPostId);

  if (!blogPost) {
    res.status(404).send();
    return;
  }

  res.status(200).send(blogPost);
};
