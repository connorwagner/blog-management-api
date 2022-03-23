import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Nullable } from "../../type/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import storage from "../../storage";
import { isUser, User } from "../../model/user.model";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.post("/users", bodyParser.json(), createUser);
  },
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  const invalidResponse = validateReqBody(req.body);
  if (!!invalidResponse) {
    res.status(invalidResponse.status).send(invalidResponse.body);
    return;
  }

  const user = req.body as User;
  const id = await storage.setUser(user);

  res.status(200).send({ id });
};

const validateReqBody = (body: any): Nullable<InvalidRequestResponse> => {
  if (!isUser(body)) {
    return { status: 400, body: { reason: "Invalid body format" } };
  }

  return null;
};
