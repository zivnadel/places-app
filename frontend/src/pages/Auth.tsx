import React from "react";
import Button from "../components/ui/form-elements/Button";
import FormWrapper from "../components/ui/form-elements/FormWrapper";
import Input from "../components/ui/form-elements/Input";
import Sapartor from "../components/ui/Sapartor";
import useForm from "../hooks/useForm";
import AuthContext from "../store/AuthContext";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../utils/validators";

const Auth: React.FC = () => {
  const initialFormState = {
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  };

  const { formState, inputHandler, setFormData } = useForm(initialFormState);
  const [isLoginMode, setIsLoginMode] = React.useState(true);

  const authContext = React.useContext(AuthContext);

  const authSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState.inputs);
    authContext?.login();
  };

  const switchModeHandler = () => {
    // making sure to drop / account the name field when moving from
    // signup to login mode
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <>
      <FormWrapper onSubmit={authSubmitHandler}>
        <h2 className="font-bold text-center text-3xl drop-shadow-md m-1 mb-4">
          Login Required
        </h2>
        <Sapartor />
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name!"
            onInput={inputHandler}
          />
        )}
        <Input
          className="w-full"
          element="input"
          id="email"
          type="email"
          label="Email"
          errorText="Please enter a valid email!"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Input
          className="w-full"
          element="input"
          id="password"
          type="password"
          label="Password"
          errorText="Please enter a valid password! (at least 6 characters)"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
        />
        <div className="text-center">
          <Button
            className="mr-2 mb-2"
            type="submit"
            disabled={!formState.isValid}
          >
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
          <Button type="button" inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
        </div>
      </FormWrapper>
    </>
  );
};

export default Auth;
