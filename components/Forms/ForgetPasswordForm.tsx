import { useState, ChangeEvent, FormEvent } from "react";
import {
  IForgetPasswordInputs,
  IVerifyAccountResponse,
} from "../../configs/interfaces";
import { passwordRegex } from "../../configs/regexes";
import { ResponseData, Status } from "../../configs/types";
import ApiService from "../../network/apiService";
import errorHandler from "../../network/errorHandler";
import Button from "../Buttons/Button";
import PasswordInput from "./PasswordInput";

type ForgetPasswordInputKeys = keyof IForgetPasswordInputs;

interface IForgetPasswordForm {
  updateResponse: (status: Status, message: string) => void;
  response: ResponseData;
  userId: number | string;
  emailToken: string;
}

const ForgetPasswordForm = ({
  updateResponse,
  response,
  userId,
  emailToken,
}: IForgetPasswordForm) => {
  const [data, setData] = useState<IForgetPasswordInputs>({
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name as ForgetPasswordInputKeys;

    setData((prevData) => {
      if (name === "password" && value === "") {
        e.target.setCustomValidity("Password cannot be empty");
      }

      if (name === "confirm_password" && value === "") {
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
      e.preventDefault();
      updateResponse("LOADING", "");
      const response = await ApiService.forgetPassword({
        userID: userId,
        token: emailToken,
        password: data.password,
        confirmPassword: data.confirm_password,
      });

      const message = response.data.message;
      updateResponse("SUCCESS", message);
    } catch (error) {
      const errData = errorHandler<IVerifyAccountResponse>(error);
      const message = errData?.message
        ? errData.message
        : "Something Went Wrong";
      updateResponse("ERROR", message);
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
    <div>
      <h1 className="text-3xl font-bold capitalize text-primary-400">
        Reset password
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-3 text-black mt-3"
      >
        <PasswordInput
          name="password"
          label="New password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          pattern={passwordRegex}
          errorMsg={
            "Password must contain: \n • at least 1 digit \n • minimum length of 8 \n • maximum length of 20"
          }
        />
        <PasswordInput
          label="Confirm new password"
          name="confirm_password"
          value={data.confirm_password}
          onChange={handleChange}
          placeholder="Confirm Password"
          pattern={data.password}
          errorMsg={"Confirm password must match Password"}
        />
        <Button
          type="submit"
          disabled={isButtonDisabled}
          className="text-xl mt-11"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
