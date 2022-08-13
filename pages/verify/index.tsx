import { GetServerSideProps, NextPage } from "next";
import MailResponse from "../../components/MailResponse";
import {
  Status,
  VerifyErrorResponse,
  VerifyResponse,
} from "../../configs/types";
import apiClient from "../../network/apiClient";
import axios, { AxiosError } from "axios";
import isNumeric from "../../helpers/isNumeric";

interface IVerify {
  status: Status;
  message: string;
}

const Verify: NextPage<IVerify> = ({ status, message }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <MailResponse status={status} message={message} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IVerify> = async (ctx) => {
  const { userID, token } = ctx.query;

  // Check type of uid and token
  let id = null;
  let emailToken = null;
  let message = "";

  if (typeof userID === "string") {
    if (isNumeric(userID)) {
      id = Number(userID);
    } else {
      id = userID;
    }
  }

  if (typeof token === "string") {
    emailToken = token;
  }

  // Request to backend
  // Set Status of response to display correct component (email verified, already verified, error)
  let status: Status;
  try {
    const res = await apiClient.post<VerifyResponse>("/auth/verify", {
      userID: id,
      token: emailToken,
    });
    const data = res.data;
    message = data.message;
    status = "SUCCESS";
  } catch (error) {
    // CHECK IF ALREADY VERIFIED ERROR
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<VerifyErrorResponse>;
      message = axiosError.response?.data?.message ?? "Something Went Wrong";
    }
    status = "ERROR";
  }

  return {
    props: { status, message },
  };
};

export default Verify;
