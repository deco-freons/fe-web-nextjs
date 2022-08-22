export type Status = "SUCCESS" | "ERROR" | "LOADING" | "INITIAL" | "EXPIRED";

export type Color = "primary" | "inverse";

export type ResponseData = {
  status: Status;
  message: string;
};
