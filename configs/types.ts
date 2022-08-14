export type Status = "SUCCESS" | "ERROR" | "LOADING" | "INITIAL";

export type Color = "primary" | "inverse";

export type VerifyResponse = {
  message: string;
  statusCode: number;
};

export type VerifyErrorResponse = {
  message: string;
  statusCode: number;
};

export type Response = {
  status: Status
  message: string
}