export interface InvalidRequestResponse {
  status: 400;
  body: {
    reason: string;
  };
}
