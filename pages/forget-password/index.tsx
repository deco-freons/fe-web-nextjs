import type { GetServerSideProps, NextPage } from "next";
import { ChangeEvent, useState, FormEvent } from "react";
import PasswordInput from "../../components/forms/PasswordInput";
import Button from "../../components/Button";
import {
  IForgetPasswordInputs,
  IVerifyAccountResponse,
} from "../../configs/interfaces";
import verifyUserId from "../../helpers/verifyUserId";
import verifyToken from "../../helpers/verifyToken";
import { passwordRegex } from "../../configs/regexes";
import ApiService from "../../network/apiService";
import { ResponseData } from "../../configs/types";
import errorHandler from "../../network/errorHandler";

type ForgetPasswordInputKeys = keyof IForgetPasswordInputs;
interface IForgetPassword {
  userId: string | number;
  emailToken: string;
}
const ForgetPassword: NextPage<IForgetPassword> = ({ userId, emailToken }) => {
  const [data, setData] = useState<IForgetPasswordInputs>({
    password: "",
    confirm_password: "",
  });
  const [response, setResponse] = useState<ResponseData>({
    status: "INITIAL",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name as ForgetPasswordInputKeys;

    setData((prevData) => {
      if (name === "password" && value === "") {
        // NGE CEK REGEX
        e.target.setCustomValidity("Password cannot be empty");
      }

      if (name === "confirm_password" && value === "") {
        // NGE CEK REGEX
        e.target.setCustomValidity("Confirm password cannot be empty");
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setResponse({ status: "LOADING", message: "" });
      e.preventDefault();
      const response = await ApiService.forgetPassword({
        userID: userId,
        token: emailToken,
        password: data.password,
        confirmPassword: data.confirm_password,
      });

      const message = response.data.message;
      setResponse({ status: "SUCCESS", message });
    } catch (error) {
      const errData = errorHandler<IVerifyAccountResponse>(error);
      const message = errData?.message
        ? errData.message
        : "Something Went Wrong";
      setResponse({ status: "ERROR", message });
    } finally {
      setData({
        password: "",
        confirm_password: "",
      });
    }
  };

  const isButtonDisabled: boolean =
    response.status === "LOADING" ||
    data.password === "" ||
    data.confirm_password === "" ||
    data.password !== data.confirm_password;

  return (
    <div className="h-full flex flex-col justify-center items-center gap-8">
      <div className="bg-neutral-100 p-5 rounded-md text-neutral-800 shadow-xl w-full sm:w-80">
        <h1 className="text-xl font-extrabold text-center capitalize">
          Reset your password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4 text-black mt-5"
        >
          <PasswordInput
            name="password"
            label="Password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            pattern={passwordRegex}
            errorMsg={
              "Password must contain: \n • at least 1 digit \n • minimum length of 8 \n • maximum length of 20"
            }
          />

          <PasswordInput
            label="Confirm Password"
            name="confirm_password"
            value={data.confirm_password}
            onChange={handleChange}
            placeholder="Confirm Password"
            pattern={data.password}
            errorMsg={"Confirm password must match Password"}
          />
          <Button type="submit" disabled={isButtonDisabled}>
            Submit
          </Button>
        </form>
      </div>
      {(response.status === "SUCCESS" || response.status === "ERROR") && (
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
