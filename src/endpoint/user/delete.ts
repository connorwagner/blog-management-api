import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import { Nullable } from "../../type/nullable.type";
import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";
import { userStorage } from "../../storage";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.delete("/users/:id", deleteUser);
  },
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const invalidResponse = validateReqParams(req.params);
  if (!!invalidResponse) {
    res.status(invalidResponse.status).send(invalidResponse.body);
    return;
  }

  const userId = parseInt(req.params.id);
  const user = await userStorage.get(userId);

  if (!user) {
    res.status(404).send();
    return;
  }

  await userStorage.delete(userId);

  res.status(200).send(user);
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
