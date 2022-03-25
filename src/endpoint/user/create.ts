import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { User } from "../../model/user.model";
import { userStorage } from "../../storage";
import { userValidator } from "./validator/user-validator";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.post("/users", bodyParser.json(), userValidator(), createUser);
  },
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  const user = req.body as User;
  const id = await userStorage.set(user, null);

  res.status(200).send({ id });
};
