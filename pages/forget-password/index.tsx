import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import verifyUserId from "../../helpers/verifyUserId";
import verifyToken from "../../helpers/verifyToken";
import { ResponseData, Status } from "../../configs/types";
import ForgetPasswordForm from "../../components/Forms/ForgetPasswordForm";
import Unlock from "../../public/unlock.svg";
import LinkButton from "../../components/Buttons/LinkButton";
import Loading from "../../public/loading.svg";
import Head from "next/head";

interface IForgetPassword {
  userId: string | number;
  emailToken: string;
}
const ForgetPassword: NextPage<IForgetPassword> = ({ userId, emailToken }) => {
  const [response, setResponse] = useState<ResponseData>({
    status: "INITIAL",
    message: "",
  });

  const updateResponse = (status: Status, message: string) => {
    setResponse({ status, message });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-8">
      <Head>
        <title key="title">Forget Password</title>
      </Head>

      <div
        className={`bg-neutral-100 px-7 flex flex-col gap-12 min-h-[380px] ${
          response.status === "SUCCESS" ? "sm:px-16" : "sm:px-10 "
        } py-5 rounded-[40px] text-neutral-800 shadow-xl w-full sm:w-[426px]`}
      >
        {response.status === "LOADING" ? (
          <Loading className="stroke-primary-400 w-16 h-16 animate-spin m-auto text-primary-400" />
        ) : response.status === "SUCCESS" ? (
          <>
            <Unlock className="w-32 h-32 mx-auto fill-primary-400" />
            <p className=" text-3xl font-bold text-center text-neutral-900">
              Your password has been reset
            </p>
            <LinkButton
              href="decofreonsfe://app/login"
              className="w-full text-xl font-bold py-2.5"
            >
              Sign In
            </LinkButton>
          </>
        ) : (
          <>
            <ForgetPasswordForm
              emailToken={emailToken}
              userId={userId}
              response={response}
              updateResponse={updateResponse}
            />
          </>
        )}
      </div>
      {response.status === "ERROR" && (
        <p className="font-bold text-2xl text-center">{response.message}</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IForgetPassword> = async (
  ctx
) => {
  const { userID, token } = ctx.query;

  // Check type of uid and token
  const userId = verifyUserId(userID);
  const emailToken = verifyToken(token);

  return {
    props: { userId, emailToken },
  };
};

export default ForgetPassword;
