export type Status = "SUCCESS" | "ERROR";

export type Color = "primary" | "inverse";

export type VerifyResponse = {
  message: string;
  statusCode: number;
};

export type VerifyErrorResponse = {
  message: string;
  statusCode: number;
};
