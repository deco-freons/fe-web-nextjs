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

  const iconStyle =
    "absolute right-1.5 top-2 flex items-center h-5 w-5 cursor-pointer select-none text-neutral-900";

  return (
    <div className="text-neutral-800">
      {label && (
        <label htmlFor={name} className="block text-xs font-bold group">
          {label}
        </label>
      )}

      <div className="relative mt-2">
        {isHidden ? (
          <EyeSlash className={iconStyle} onClick={toggleHidden} />
        ) : (
          <Eye className={iconStyle} onClick={toggleHidden} />
        )}

        <input
          id={name}
          type={isHidden ? "password" : "text"}
          name={name}
          className="peer py-1.5 rounded-md pl-2 pr-8 w-full bg-primary-400 bg-opacity-20
           border border-transparent focus:outline-none focus:border focus:border-primary-400 focus:ring focus:ring-primary-400 focus:ring-opacity-30
           invalid:border-error-400 invalid:ring invalid:ring-error-400 invalid:ring-opacity-30 
           focus:invalid:border-error-400 focus:invalid:ring focus:invalid:ring-error-400 focus:invalid:ring-opacity-30"
          onChange={onChange}
          value={value}
          onInput={(e) => {
            e.currentTarget.setCustomValidity("");
          }}
          {...rest}
        />
        <p className=" text-xs break-words whitespace-pre-wrap mt-1.5 text-error-400 hidden peer-invalid:block">
          {errorMsg}
        </p>
      </div>
    </div>
  );
};

export default PasswordInput;
