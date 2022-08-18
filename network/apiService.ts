import { AxiosRequestConfig } from "axios";
import {
  IForgestPasswordRequest,
  IForgetPasswordResponse,
  IVerifyAccountRequest,
  IVerifyAccountResponse,
} from "../configs/interfaces";
import apiClient from "./apiClient";

const ApiService = {
  verifyAccount: async (
    data: IVerifyAccountRequest,
    config?: AxiosRequestConfig
  ) => {
    const response = await apiClient.post<IVerifyAccountResponse>(
      "/auth/verify",
      { ...data },
      { ...config }
    );
    return response;
  },
  forgetPassword: async (
    data: IForgestPasswordRequest,
    config?: AxiosRequestConfig
  ) => {
    const response = await apiClient.patch<IForgetPasswordResponse>("/auth/forget-password", {...data}, {...config})
    return response
  },
};
export default ApiService;
