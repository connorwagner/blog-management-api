import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.post("/blogs", createBlogPost);
  },
};

const createBlogPost = (req: Request, res: Response): void => {
  res.send(`Creating blog post for request ${JSON.stringify(req.body)}`);
};
