
// Verify Account
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

// Forget Password
export interface IPasswordInputData {
  value: string;
  error: string;
}
export interface IForgetPasswordInputs {
  password: IPasswordInputData;
  confirm_password: IPasswordInputData;
}