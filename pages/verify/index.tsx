import { GetServerSideProps, NextPage } from "next";
import MailResponse from "../../components/MailResponse";
import { ResponseData } from "../../configs/types";
import { useEffect, useState } from "react";
import verifyUserId from "../../helpers/verifyUserId";
import verifyToken from "../../helpers/verifyToken";
import ApiService from "../../network/apiService";
import errorHandler from "../../network/errorHandler";
import {
  IForgetPasswordResponse,
  IVerifyAccountResponse,
} from "../../configs/interfaces";
import Button from "../../components/Button";

interface IVerify {
  userId: string | number;
  emailToken: string;
}

const Verify: NextPage<IVerify> = ({ userId, emailToken }) => {
  const [response, setResponse] = useState<ResponseData>({
    status: "LOADING",
    message: "",
  });
  const [showButton, setShowButton] = useState<boolean>(true);

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
        const errData = errorHandler<IForgetPasswordResponse>(error);
        const message = errData?.message
          ? errData.message
          : "Something Went Wrong";
        if (errData?.statusCode === 401) {
          setShowButton(true);
        }
        setResponse({ status: "ERROR", message });
      }
    };

    verifyAccount(controller.signal);

    return () => {
      controller.abort();
    };
  }, [emailToken, userId]);

  const handleReverify = async () => {
    try {
      setResponse({ status: "LOADING", message: "" });
      setShowButton(false);
      const response = await ApiService.resendVerifyAccount({
        token: emailToken,
        userID: userId,
      });
      setResponse({ status: "SUCCESS", message: response.data.message });
    } catch (error) {
      const errData = errorHandler<IVerifyAccountResponse>(error);
      const message = errData?.message
        ? errData.message
        : "Something Went Wrong";
      setResponse({ status: "ERROR", message });
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <MailResponse status={response.status} message={response.message} />
      {showButton && (
        <Button
          colorType="inverse"
          className="mt-12 text-xl uppercase"
          onClick={handleReverify}
        >
          Re-verify Account
        </Button>
      )}
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
