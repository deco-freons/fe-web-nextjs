export interface IVerifyAccountRequest {
  userID: number | string;
  token: string;
}

export interface IVerifyAccountResponse {
  message: string;
  statusCode: number;
}

export interface IVerifyAccountResponseError {
  message: string;
  statusCode: number;
}
