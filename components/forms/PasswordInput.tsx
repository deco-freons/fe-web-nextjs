import Eye from "../../public/eye.svg";
import EyeSlash from "../../public/eye-slash.svg";
import React, { useState } from "react";

interface IPasswordInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMsg: string;
}

const PasswordInput = ({
  name,
  label,
  onChange,
  value,
  errorMsg,
  ...rest
}: IPasswordInput) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => {
    setIsHidden((prevState) => !prevState);
  };

  return (
    <div className="text-neutral-800">
      {label && (
        <label htmlFor={name} className="block text-xs font-bold">
          {label}
        </label>
      )}

      <div className="relative mt-2">
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer select-none text-neutral-900"
          onClick={toggleHidden}
        >
          {isHidden ? <EyeSlash /> : <Eye />}
        </span>
        <input
          id={name}
          type={isHidden ? "password" : "text"}
          name={name}
          className="py-1.5 rounded-md pl-2 pr-8 bg-primary-400 bg-opacity-20 focus:outline focus:outline-primary-400 focus:ring focus:ring-primary-400 focus:ring-opacity-60 w-full"
          onChange={onChange}
          value={value}
          {...rest}
        />
      </div>
      {errorMsg && (
        <p className="text-xxs break-words whitespace-pre-wrap mt-1.5 text-error-400">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
