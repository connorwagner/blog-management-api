import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { commentStorage } from "../../storage";
import { idValidator } from "../validator/id-validator";
import { commentValidator } from "./validator/comment-validator";
import { ShouldEnsureEntityExists } from "../validator/entity-exists-validator";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.patch(
      "/comments/:id",
      bodyParser.json(),
      idValidator({ paramName: "id" }),
      commentValidator({
        partial: true,
        noId: true,
        ensureAuthorExists: ShouldEnsureEntityExists.IfIdPresent,
        ensureBlogPostExists: ShouldEnsureEntityExists.IfIdPresent,
        ensureParentCommentExists: ShouldEnsureEntityExists.IfIdPresent,
      }),
      updateBlogPost
    );
  },
};

const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  const commentId = parseInt(req.params.id);
  let comment = await commentStorage.get(commentId);
  if (!comment) {
    res.status(404).send();
  }
  comment = { ...comment, ...req.body };

  const id = await commentStorage.set(comment!, commentId);

  res.status(200).send({ id });
};
