import { Express } from "express";

export interface EndpointConfiguration {
  configure: (app: Express) => void;
}
