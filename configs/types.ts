export type Status = "SUCCESS" | "ERROR" | "LOADING" | "INITIAL";

export type Color = "primary" | "inverse";

export type ResponseData = {
  status: Status;
  message: string;
};
