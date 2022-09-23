import React from "react";

interface Props {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const FormWrapper: React.FC<Props> = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="list-none my-0 p-2 mx-auto w-[90%] max-w-[40rem] shadow-md rounded-md bg-light"
    >
      {children}
    </form>
  );
};

export default FormWrapper;
