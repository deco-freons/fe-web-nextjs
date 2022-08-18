import type { GetServerSideProps, NextPage } from "next";
import { ChangeEvent, useState } from "react";
import PasswordInput from "../../components/forms/PasswordInput";
import Button from "../../components/Button";
import { IForgetPasswordInputs } from "../../configs/interfaces";
import verifyUserId from "../../helpers/verifyUserId";
import verifyToken from "../../helpers/verifyToken";


type ForgetPasswordInputKeys = keyof IForgetPasswordInputs;
interface IForgetPassword {
  userId: string | number;
  emailToken: string;
}
const ForgetPassword: NextPage<IForgetPassword> = () => {
  const [data, setData] = useState<IForgetPasswordInputs>({
    password: { value: "", error: "" },
    confirm_password: { value: "", error: "" },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name as ForgetPasswordInputKeys; 

    setData((prevData) => {
      let error = "";
      if (name === "password") {
        // NGE CEK REGEX
        if (value === "") {
          error = "Password cannot be empty";
        } else {
          const errorConfirm =
            value !== prevData.confirm_password.value &&
            prevData.confirm_password.value !== ""
              ? "Confirm password must match Password"
              : "";

          return {
            confirm_password: {
              ...prevData.confirm_password,
              error: errorConfirm,
            },
            [name]: { ...prevData[name], value, error: "" },
          };
        }
        // EMPTY
        // CONFIRM REGEX
      } else if (name === "confirm_password") {
        if (value === "") {
          error = "Confirm password cannot be empty";
        } else if (e.target.validity.patternMismatch) {
          error =
            "Confirm password must match Password"; 
        }
      }

      return {
        ...prevData,
        [name]: { ...prevData[name], value, error },
      };
    });
  };
  console.log(data);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="bg-neutral-100 p-5 rounded-md text-neutral-800 shadow-xl w-full sm:w-80">
        <h1 className="text-xl font-extrabold text-center capitalize">
          Reset your password
        </h1>
        <form className="flex flex-col gap-y-4 text-black mt-5">
          <PasswordInput
            name="password"
            label="Password"
            value={data.password.value}
            onChange={handleChange}
            placeholder="description error"
            errorMsg={data.password.error}
          />

          <PasswordInput
            label="Confirm Password"
            name="confirm_password"
            value={data.confirm_password.value}
            onChange={handleChange}
            placeholder="description error"
            pattern={data.password.value}
            errorMsg={data.confirm_password.error}
          />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};


export const getServerSideProps: GetServerSideProps<IForgetPassword> = async (ctx) => {
  const { userID, token } = ctx.query;

  // Check type of uid and token
  const userId = verifyUserId(userID);
  const emailToken = verifyToken(token);

  return {
    props: { userId, emailToken },
  };
  
};

export default ForgetPassword;
