import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { userStorage } from "../../storage";
import { userIdValidator } from "./validator/user-id-validator";
import { userValidator } from "./validator/user-validator";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.patch(
      "/users/:id",
      bodyParser.json(),
      userIdValidator({ paramName: "id" }),
      userValidator({ partial: true }),
      updateUser
    );
  },
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
  let user = await userStorage.get(userId);
  if (!user) {
    res.status(404).send();
  }
  user = { ...user, ...req.body };

  const id = await userStorage.set(user!, userId);

  res.status(200).send({ id });
};
