import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import { commentStorage } from "../../storage";
import { idValidator } from "../validator/id-validator";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.get("/comments/:id", idValidator({ paramName: "id" }), getComment);
  },
};

const getComment = async (req: Request, res: Response): Promise<void> => {
  const commentId = parseInt(req.params.id);
  const comment = await commentStorage.get(commentId);

  if (!comment) {
    res.status(404).send();
    return;
  }

  res.status(200).send(comment);
};
