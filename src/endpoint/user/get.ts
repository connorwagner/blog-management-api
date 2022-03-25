import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import { userStorage } from "../../storage";
import { userIdValidator } from "./validator/user-id-validator";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.get("/users/:id", userIdValidator({ paramName: "id" }), getUser);
  },
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
  const user = await userStorage.get(userId);

  if (!user) {
    res.status(404).send();
    return;
  }

  res.status(200).send(user);
};
