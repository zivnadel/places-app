import React from "react";

interface FormState {
  inputs: any;
  isValid: boolean;
}

type FormAction =
  | {
      type: "INPUT_CHANGE";
      inputId: string;
      isValid: boolean;
      value: any;
    }
  | {
      type: "SET_DATA";
      inputs: any;
      formIsValid: boolean;
    };

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      console.log(formIsValid);
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        ...state,
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

const useForm = <T extends FormState>(initialFormState: T) => {
  const [formState, dispatch] = React.useReducer(formReducer, initialFormState);

  const inputHandler = React.useCallback(
    (id: string, value: any, isValid: boolean) => {
      dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
    },
    []
  );

  const setFormData = React.useCallback(
    (inputData: any, formValidity: boolean) => {
      dispatch({
        type: "SET_DATA",
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return {
    formState: formState as T,
    inputHandler,
    setFormData,
  };
};

export default useForm;
