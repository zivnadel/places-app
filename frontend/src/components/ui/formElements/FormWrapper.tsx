import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  className?: string;
}

const FormWrapper: React.FC<Props> = ({ children, onSubmit, className }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(
        `list-none my-0 p-2 mx-auto w-[90%] max-w-[40rem] shadow-md rounded-md bg-light ${className}`
      )}
    >
      {children}
    </form>
  );
};

export default FormWrapper;
