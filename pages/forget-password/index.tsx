import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import verifyUserId from "../../helpers/verifyUserId";
import verifyToken from "../../helpers/verifyToken";
import { ResponseData, Status } from "../../configs/types";
import ForgetPasswordForm from "../../components/Forms/ForgetPasswordForm";
import Unlock from "../../public/unlock.svg";
import Button from "../../components/Button";

interface IForgetPassword {
  userId: string | number;
  emailToken: string;
}
const ForgetPassword: NextPage<IForgetPassword> = ({ userId, emailToken }) => {
  const [response, setResponse] = useState<ResponseData>({
    status: "SUCCESS",
    message: "",
  });

  const updateResponse = (status: Status, message: string) => {
    setResponse({ status, message });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-8">
      <div
        className={`bg-neutral-100 px-7 pb-10 flex flex-col gap-12 ${
          response.status === "SUCCESS" ? "sm:px-16" : "sm:px-10 "
        } pt-5 rounded-[40px] sm:pb-14 text-neutral-800 shadow-xl w-full sm:w-[426px]`}
      >
        {response.status !== "SUCCESS" ? (
          <>
            <ForgetPasswordForm
              emailToken={emailToken}
              userId={userId}
              response={response}
              updateResponse={updateResponse}
            />
            {response.status === "ERROR" && (
              <p className="font-bold text-2xl text-center">
                {response.message}
              </p>
            )}
          </>
        ) : (
          <>
            <Unlock className="w-32 h-32 mx-auto" />

            <p className=" text-3xl font-bold text-center text-neutral-900">
              Your password has been reset
            </p>
            <Button className="w-full">Sign In</Button>
          </>
        )}
      </div>
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
