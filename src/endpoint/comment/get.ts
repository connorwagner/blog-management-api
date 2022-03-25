import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import { Nullable } from "../../type/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import { commentStorage } from "../../storage";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.get("/comments/:id", getComment);
  },
};

const getComment = async (req: Request, res: Response): Promise<void> => {
  const invalidResponse = validateReqParams(req.params);
  if (!!invalidResponse) {
    res.status(invalidResponse.status).send(invalidResponse.body);
    return;
  }

  const commentId = parseInt(req.params.id);
  const comment = await commentStorage.get(commentId);

  if (!comment) {
    res.status(404).send();
    return;
  }

  res.status(200).send(comment);
};

const validateReqParams = (params: any): Nullable<InvalidRequestResponse> => {
  if (!params.id) {
    return { status: 400, body: { reason: "Comment ID is required" } };
  }

  if (parseInt(params.id) == NaN) {
    return { status: 400, body: { reason: "Comment ID must be numeric" } };
  }

  return null;
};
