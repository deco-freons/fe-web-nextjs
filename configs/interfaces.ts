
// Verify Account
export interface IVerifyAccountRequest {
  userID: number | string;
  token: string;
}

export interface IVerifyAccountResponse {
  message: string;
  statusCode: number;
}


// Forget Password
export interface IForgetPasswordInputs {
  password: string;
  confirm_password: string;
}

export interface IForgestPasswordRequest {
  userID: number | string
  password: string;
  confirmPassword: string;
  token: string
}

export interface IForgetPasswordResponse {
  message: string;
  statusCode: number
}