import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/ui/Card";
import ErrorModal from "../components/ui/ErrorModal";
import Button from "../components/ui/formElements/Button";
import FormWrapper from "../components/ui/formElements/FormWrapper";
import Input from "../components/ui/formElements/Input";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useAxios from "../hooks/useAxios";
import useForm from "../hooks/useForm";
import Place from "../models/PlaceModel";
import AuthContext from "../store/AuthContext";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../utils/validators";

const UpdatePlace: React.FC = () => {
  const { pid } = useParams<{ pid: string }>();

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

  const { isLoading, error, sendRequest, clearError } = useAxios();

  const [loadedPlace, setLoadedPlace] = React.useState<Place>();

  const navigate = useNavigate();

  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    sendRequest<Place>(
      `${process.env.REACT_APP_BACKEND_URL}/api/places/${pid}`
    ).then((data) => {
      setLoadedPlace(data);
      setFormData(
        {
          title: {
            value: data.title,
            isValid: true,
          },
          description: {
            value: data.description,
            isValid: true,
          },
        },
        true
      );
    });
  }, [sendRequest, setFormData, pid]);

  const placeUpdateSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/places/${pid}`,
      "PATCH",
      {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      },
      {
        Authorization: `Bearer ${authContext!.token}`,
      }
    ).then(() => {
      navigate(`/${authContext?.uid}/places`);
    });
  };

  if (isLoading) return <LoadingSpinner asOverlay />;

  if (!loadedPlace && !error) {
    return (
      <div className="flex items-center justify-center">
        <Card className="text-center w-[90%] md:w-[50%]">
          <h2 className="font-bold text-3xl text-secondary">
            Place not found.
          </h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
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
    </>
  );
};

export default UpdatePlace;
