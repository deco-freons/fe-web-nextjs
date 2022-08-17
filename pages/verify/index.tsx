import { GetServerSideProps, NextPage } from "next";
import MailResponse from "../../components/MailResponse";
import { VerifyResponseData } from "../../configs/types";
import { useEffect, useState } from "react";
import verifyUserId from "../../helpers/verifyUserId";
import verifyToken from "../../helpers/verifyToken";
import ApiService from "../../network/apiService";
import errorHandler from "../../network/errorHandler";
import { IVerifyAccountResponseError } from "../../configs/interfaces";

interface IVerify {
  userId: string | number;
  emailToken: string;
}

const Verify: NextPage<IVerify> = ({ userId, emailToken }) => {
  const [response, setResponse] = useState<VerifyResponseData>({
    status: "LOADING",
    message: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    const verifyAccount = async (signal: AbortSignal) => {
      try {
        const response = await ApiService.verifyAccount(
          { userID: userId, token: emailToken },
          { signal: signal }
        );
        setResponse({ status: "SUCCESS", message: response.data.message });
      } catch (error) {
        const errData = errorHandler<IVerifyAccountResponseError>(error);
        const message = errData?.message
          ? errData.message
          : "Something Went Wrong";
        setResponse({ status: "ERROR", message });
      }
    };

    verifyAccount(controller.signal);

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
  const userId = verifyUserId(userID);
  const emailToken = verifyToken(token);

  return {
    props: { userId, emailToken },
  };
};

export default Verify;
