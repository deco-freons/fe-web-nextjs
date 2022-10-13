import { ReactNode } from "react";

interface ICard {
  children: ReactNode;
  className?: string;
}

const Card = ({ className = "", children }: ICard) => {
  return (
    <div
      className={`flex flex-col bg-neutral-100 px-7 gap-12 min-h-[380px] py-7 rounded-[40px] text-neutral-800 shadow-xl w-full sm:w-[426px] ${className} `}
    >
      {children}
    </div>
  );
};

export default Card;
