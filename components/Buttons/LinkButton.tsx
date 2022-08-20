import React from "react";
import { Color } from "../../configs/types";

interface ILinkButton extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  colorType?: Color;
}

const LinkButton = ({
  colorType = "primary",
  className,
  children,
  ...rest
}: ILinkButton) => {
  const baseButtonStyle = `rounded-lg px-2 py-3 font-bold text-center ${
    colorType === "primary"
      ? "bg-primary-400 text-neutral-100 disabled:bg-neutral-700"
      : "bg-neutral-100 text-primary-400 disabled:bg-neutral-700 disabled:text-neutral-100"
  }`;

  return (
    <a {...rest} className={`${baseButtonStyle} ${className || ""} `}>
      {children}
    </a>
  );
};

export default LinkButton;
