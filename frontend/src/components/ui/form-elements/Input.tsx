import React from "react";
import { twMerge } from "tailwind-merge";

import { validate } from "../../../utils/validators";

interface Props {
  id: string;
  element: string;
  label: string;
  validators: any[];
  onInput: (id: string, value: string, isValid: boolean) => void;
  type?: string;
  initialValue?: string;
  initialValid?: boolean;
  className?: string;
  rows?: number;
  placeholder?: string;
  errorText?: string;
}

const inputReducer = (
  state: { value: string; isValid: boolean; isTouched: boolean },
  action:
    | { type: "CHANGE"; payload: string; validators: any[] }
    | { type: "TOUCH" }
) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input: React.FC<Props> = ({
  className,
  id,
  type,
  placeholder,
  rows,
  element,
  label,
  errorText,
  validators,
  onInput,
  initialValue,
  initialValid,
}) => {
  const [inputState, dispatch] = React.useReducer(inputReducer, {
    value: initialValue || "",
    isValid: initialValid || false,
    isTouched: false,
  });

  React.useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: "CHANGE", payload: e.target.value, validators });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const inputClasses = twMerge(
    `block w-full border-2 border-[#ccc] rounded-lg bg-light py-[0.15rem] px-[0.25rem] focus:outline-none focus:bg-[#ebebeb] focus:border-secondary ${
      !inputState.isValid &&
      inputState.isTouched &&
      "border-red-400 bg-[#ffd1d1]"
    }`
  );

  const inputElement =
    element === "input" ? (
      <input
        className={inputClasses}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        className={inputClasses}
        id={id}
        rows={rows || 3}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div className={twMerge(`border-none my-4 mx-0 ${className}`)}>
      <label
        htmlFor={id}
        className={twMerge(
          `block font-semibold mb-1 ${
            !inputState.isValid && inputState.isTouched && "text-red-400"
          }`
        )}
      >
        {label}
      </label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && (
        <p className="text-red-400 mt-2 text-semibold">{errorText}</p>
      )}
    </div>
  );
};

export default Input;
