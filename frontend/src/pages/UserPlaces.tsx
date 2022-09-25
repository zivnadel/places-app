import React from "react";
import { useParams } from "react-router-dom";
import PlacesList from "../components/places/PlacesList";
import ErrorModal from "../components/ui/ErrorModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useAxios from "../hooks/useAxios";
import Place from "../models/PlaceModel";

const UserPlaces: React.FC = () => {
  const { uid } = useParams();

  const { isLoading, error, sendRequest, clearError } = useAxios();

  const [loadedPlaces, setLoadedPlaces] = React.useState<Place[] | null>(null);

  React.useEffect(() => {
    sendRequest<Place[]>(
      `${process.env.REACT_APP_BACKEND_URL}/api/places/user/${uid}`
    ).then((data) => {
      setLoadedPlaces(data);
    });
  }, [sendRequest, uid]);

  const placeDeletedHandler = (deletedPlaceId: string) => {
    setLoadedPlaces((prevPlaces) => {
      if (prevPlaces) {
        return prevPlaces.filter((p) => p.id !== deletedPlaceId);
      }
      return null;
    });
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        loadedPlaces && (
          <PlacesList
            onDeletePlace={placeDeletedHandler}
            items={loadedPlaces}
          />
        )
      )}
    </>
  );
};

export default UserPlaces;
