export type Status = "SUCCESS" | "ERROR" | "LOADING" | "INITIAL";

export type Color = "primary" | "inverse";

export type VerifyResponseData = {
  status: Status;
  message: string;
};
