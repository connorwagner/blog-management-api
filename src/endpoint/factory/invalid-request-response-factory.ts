import { InvalidRequestResponse } from "../model/response/invalid-request-response.model";

export const invalidRequestResponseFactory = (
  reason: string
): InvalidRequestResponse => ({ status: 400, body: { reason } });
