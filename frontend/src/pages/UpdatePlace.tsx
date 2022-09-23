import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/form-elements/Button";
import FormWrapper from "../components/ui/form-elements/FormWrapper";
import Input from "../components/ui/form-elements/Input";
import useForm from "../hooks/useForm";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../utils/validators";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://images.unsplash.com/photo-1662720215950-ce15c16373d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://images.unsplash.com/photo-1662720215950-ce15c16373d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UpdatePlace: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();

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
    },
    isValid: false,
  };

  const { formState, inputHandler, setFormData } = useForm(initialFormState);

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  React.useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return identifiedPlace ? (
    formState.inputs.title.value ? (
      <FormWrapper onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title!"
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description!"
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </FormWrapper>
    ) : (
      <div className="text-center">
        <h2>Loading...</h2>
      </div>
    )
  ) : (
    <div className="flex items-center justify-center">
      <Card className="text-center w-[90%] md:w-[50%]">
        <h2 className="font-bold text-3xl text-secondary">Place not found.</h2>
      </Card>
    </div>
  );
};

export default UpdatePlace;
