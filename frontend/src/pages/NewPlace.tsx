import React from "react";
import Input from "../components/ui/form-elements/Input";
import Button from "../components/ui/form-elements/Button";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../utils/validators";
import FormWrapper from "../components/ui/form-elements/FormWrapper";
import useForm from "../hooks/useForm";

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
    },
    isValid: false,
  };

  const { formState, inputHandler } = useForm(initialFormState);

  const placeSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <FormWrapper onSubmit={placeSubmitHandler}>
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
  );
};

export default NewPlace;
