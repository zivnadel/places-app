import React from "react";
import Input from "../components/ui/formElements/Input";
import Button from "../components/ui/formElements/Button";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../utils/validators";
import FormWrapper from "../components/ui/formElements/FormWrapper";
import useForm from "../hooks/useForm";
import useAxios from "../hooks/useAxios";
import AuthContext from "../store/AuthContext";
import ErrorModal from "../components/ui/ErrorModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ui/formElements/ImageUpload";

const NewPlace: React.FC = () => {
  const initialFormState = {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    isValid: false,
  };

  const { formState, inputHandler } = useForm(initialFormState);

  const { isLoading, error, sendRequest, clearError } = useAxios();

  const authContext = React.useContext(AuthContext);

  const navigate = useNavigate();

  const placeSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("image", formState.inputs.image.value!);
    formData.append("creator", authContext!.uid);
    sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/places`,
      "POST",
      formData
    ).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      <FormWrapper onSubmit={placeSubmitHandler}>
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
          centered
        />
        <Input
          element="input"
          id="title"
          type="text"
          label="Title"
          errorText="Please enter a valid title!"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          id="description"
          label="Description"
          errorText="Please enter a valid description! (at least 5 characters)"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="address"
          label="Address"
          errorText="Please enter a valid address!"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </FormWrapper>
    </>
  );
};

export default NewPlace;
