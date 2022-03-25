import { RequestHandler, Request, Response } from "express";

export const promisifyMiddleware = (
  middleware: RequestHandler,
  req: Request,
  res: Response
): Promise<void> =>
  new Promise((resolve) => {
    middleware(req, res, () => {
      resolve();
    });
  });
