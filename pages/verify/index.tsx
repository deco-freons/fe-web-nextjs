import { GetServerSideProps, NextPage } from "next";
import MailResponse from "../../components/MailResponse";
import {
  Response,
  Status,
  VerifyErrorResponse,
  VerifyResponse,
} from "../../configs/types";
import apiClient from "../../network/apiClient";
import axios, { AxiosError } from "axios";
import isNumeric from "../../helpers/isNumeric";
import { useEffect, useState } from "react";

interface IVerify {
  userId: string | number;
  emailToken: string;
}

const Verify: NextPage<IVerify> = ({ userId, emailToken }) => {
  const [response, setResponse] = useState<Response>({
    status: "LOADING",
    message: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    apiClient
      .post<VerifyResponse>(
        "/auth/verify",
        {
          userID: userId,
          token: emailToken,
        },
        { signal }
      )
      .then((res) => {
        const data = res.data;
        const message = data.message;
        setResponse({ status: "SUCCESS", message });
      })
      .catch((error) => {
        let message = "";
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<VerifyErrorResponse>;
          message =
            axiosError.response?.data?.message ?? "Something Went Wrong";
        }
        setResponse({ status: "ERROR", message });
      });

    return () => {
      controller.abort();
    };
  }, [emailToken, userId]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <MailResponse status={response.status} message={response.message} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IVerify> = async (ctx) => {
  const { userID, token } = ctx.query;

  // Check type of uid and token
  let userId: number | string = "";
  let emailToken = "";

  if (typeof userID === "string") {
    if (isNumeric(userID)) {
      userId = Number(userID);
    } else {
      userId = userID;
    }
  }

  if (typeof token === "string") {
    emailToken = token;
  }

  return {
    props: { userId, emailToken },
  };
};

export default Verify;
