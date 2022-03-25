import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Nullable } from "../../type/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import { isUser } from "../../model/user.model";
import { userStorage } from "../../storage";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.patch("/users/:id", bodyParser.json(), updateUser);
  },
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const invalidResponse = validateReq(req);
  if (!!invalidResponse) {
    res.status(invalidResponse.status).send(invalidResponse.body);
    return;
  }

  const userId = parseInt(req.params.id);
  let user = await userStorage.get(userId);
  if (!user) {
    res.status(404).send();
  }
  user = { ...user, ...req.body };

  const id = await userStorage.set(user!, userId);

  res.status(200).send({ id });
};

const validateReq = (req: Request): Nullable<InvalidRequestResponse> => {
  let invalidResponse = validateReqParams(req.params);
  if (!!invalidResponse) return invalidResponse;

  invalidResponse = validateReqBody(req.body);
  if (!!invalidResponse) return invalidResponse;

  return null;
};

const validateReqParams = (params: any): Nullable<InvalidRequestResponse> => {
  if (!params.id) {
    return { status: 400, body: { reason: "User ID is required" } };
  }

  if (parseInt(params.id) == NaN) {
    return { status: 400, body: { reason: "User ID must be numeric" } };
  }

  return null;
};

const validateReqBody = (body: any): Nullable<InvalidRequestResponse> => {
  if (!isUser(body, { partial: true })) {
    return { status: 400, body: { reason: "Invalid body format" } };
  }

  return null;
};
