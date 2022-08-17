import { AxiosRequestConfig } from "axios";
import {
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
};
export default ApiService;
