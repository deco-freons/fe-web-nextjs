import { Color } from "../configs/types";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorType?: Color;
}

const Button = ({
  colorType = "primary",
  className,
  children,
  ...rest
}: IButton) => {
  const baseButtonStyle = `rounded-md px-2 py-1 font-bold ${
    colorType === "primary"
      ? "bg-primary-400 text-neutral-100"
      : "bg-neutral-100 text-primary-400"
  }`;
  return (
    <button className={`${baseButtonStyle} ${className || ""} `} {...rest}>
      {children}
    </button>
  );
};

export default Button;
