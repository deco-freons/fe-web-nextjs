import axios, { AxiosError } from "axios";

const errorHandler = <T = any>(error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.name === "AbortError") return null;

    const axiosError = error as AxiosError<T>;
    return axiosError.response?.data;
  }

  return null;
};

export default errorHandler;
