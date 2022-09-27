import React from "react";

import Button from "../components/ui/formElements/Button";
import FormWrapper from "../components/ui/formElements/FormWrapper";
import Input from "../components/ui/formElements/Input";
import Sapartor from "../components/ui/Sapartor";
import useForm from "../hooks/useForm";
import AuthContext from "../store/AuthContext";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../utils/validators";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorModal from "../components/ui/ErrorModal";
import useAxios from "../hooks/useAxios";
import User from "../models/UserModel";
import ImageUpload from "../components/ui/formElements/ImageUpload";

interface IFormState {
  inputs: {
    email: {
      value: string;
      isValid: boolean;
    };
    password: {
      value: string;
      isValid: boolean;
    };
    name?: {
      value: string;
      isValid: boolean;
    };
    image?: {
      value: File | null;
      isValid: boolean;
    };
  };
  isValid: boolean;
}

const Auth: React.FC = () => {
  const initialFormState: IFormState = {
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

  const { formState, inputHandler, setFormData } =
    useForm<typeof initialFormState>(initialFormState);
  const [isLoginMode, setIsLoginMode] = React.useState(true);

  const { isLoading, error, sendRequest, clearError } = useAxios();

  const authContext = React.useContext(AuthContext);

  const authSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      interface IResponse {
        user: User;
        message: string;
      }

      let response;

      if (isLoginMode) {
        response = await sendRequest<IResponse>(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
          "POST",
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }
        );
      } else {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("name", formState.inputs.name!.value);
        formData.append("image", formState.inputs.image!.value!);
        response = await sendRequest<IResponse>(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
          "POST",
          formData
        );
      }
      authContext?.login(response.user.id);
    } catch (error) {}
  };

  const switchModeHandler = () => {
    // making sure to drop / account the name field when moving from
    // signup to login mode
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
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
          image: {
            value: null,
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
      {error && <ErrorModal error={error} onClear={clearError} />}
      <FormWrapper onSubmit={authSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className="font-bold text-center text-3xl drop-shadow-md m-1 mb-4">
          Login Required
        </h2>
        <Sapartor />
        {!isLoginMode && (
          <>
            <ImageUpload
              onInput={inputHandler}
              id="image"
              errorText="Please provide an image"
              centered
            />
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name!"
              onInput={inputHandler}
            />
          </>
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
