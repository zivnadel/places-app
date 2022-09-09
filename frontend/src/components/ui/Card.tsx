import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        `m-0 shadow-md rounded-md p-4 overflow-hidden bg-white ${className}`
      )}
    >
      {children}
    </div>
  );
};

export default Card;
