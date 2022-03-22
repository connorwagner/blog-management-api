import { Express } from "express";

import { allEndpoints } from "./barrel";

export const configureEndpoints = (app: Express): void => {
  allEndpoints.forEach((endpoint) => endpoint.configure(app));
};
