import { GetServerSideProps, NextPage } from "next";
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
import Button from "../../components/Buttons/Button";
import LinkButton from "../../components/Buttons/LinkButton";
import MailResponseIcon from "../../components/MailResponseIcon";
import Head from "next/head";
import Card from "../../components/Layouts/Card";

interface IVerify {
  userId: string | number;
  emailToken: string;
}

const Verify: NextPage<IVerify> = ({ userId, emailToken }) => {
  const [response, setResponse] = useState<ResponseData>({
    status: "LOADING",
    message: "",
  });

  const [isFirstLoaded, setisFirstLoaded] = useState(true);

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
          setResponse({ status: "EXPIRED", message });
        } else {
          setResponse({ status: "ERROR", message });
        }
      }
    };

    verifyAccount(controller.signal);

    return () => {
      controller.abort();
    };
  }, [emailToken, userId]);

  const handleReverify = async () => {
    try {
      setisFirstLoaded(false);
      setResponse({ status: "LOADING", message: "" });

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
      <Head>
        <title key="title">Email Verification</title>
      </Head>
      <Card
        className={`items-center
          ${
            response.status === "SUCCESS" && isFirstLoaded
              ? "justify-between"
              : "justify-center"
          }
        `}
      >
        <MailResponseIcon status={response.status} />
        <p className="text-xl sm:text-2xl font-bold text-center">
          {response.message}
        </p>
        {response.status === "SUCCESS" && isFirstLoaded && (
          <LinkButton href="decofreonsfe://app/test" className="w-full text-xl">
            Sign In
          </LinkButton>
        )}
        {response.status === "EXPIRED" && (
          <Button className="w-full text-xl" onClick={handleReverify}>
            Re-send verification Email
          </Button>
        )}
      </Card>
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
