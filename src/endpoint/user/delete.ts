import { EndpointConfiguration } from "../model/endpoint-configuration.model";
import { Express, Request, Response } from "express";
import { userStorage } from "../../storage";
import { idValidator } from "../validator/id-validator";

export const endpoint: EndpointConfiguration = {
  configure: function (app: Express): void {
    app.delete("/users/:id", idValidator({ paramName: "id" }), deleteUser);
  },
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
  const user = await userStorage.get(userId);

  if (!user) {
    res.status(404).send();
    return;
  }

  await userStorage.delete(userId);

  res.status(200).send(user);
};
