import Place from "../../models/PlaceModel";
import Button from "../ui/formElements/Button";
import React from "react";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import Map from "../ui/Map";
import AuthContext from "../../store/AuthContext";
import useAxios from "../../hooks/useAxios";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";

interface Props {
  place: Place;
  onDelete: (deletedPlaceId: string) => void;
  id: string;
}

const PlaceItem: React.FC<Props> = ({ place, id, onDelete }) => {
  const [showMap, setShowMap] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const { isLoading, error, sendRequest, clearError } = useAxios();

  const authContext = React.useContext(AuthContext);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteHandler = () => {
    setShowDeleteModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowDeleteModal(false);
    sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/places/${id}`,
      "DELETE",
      null,
      {
        Authorization: `Bearer ${authContext!.token}`,
      }
    ).then(() => {
      onDelete(id);
    });
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        heading={place.address}
        contentClasses="p-0"
        footerClasses="m-2"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="h-80 w-full">
          <Map center={place.location} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        onCancel={cancelDeleteHandler}
        heading="Are you sure?"
        footerClasses="m-2"
        footer={
          <>
            <Button className="mr-2 mb-1" inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? This action cannot be
          undone.
        </p>
      </Modal>
      <li className="my-4 mx-0">
        <Card className="p-0">
          <div className="w-full h-[12.5rem] mr-6 md:h-80">
            <img
              className="w-full h-full object-cover"
              src={`${process.env.REACT_APP_BACKEND_URL}/${place.imageUrl}`}
              alt={place.title}
            />
          </div>
          <div className="text-center p-4">
            <h2 className="mb-4 text-4xl font-bold text-primary drop-shadow-sm">
              {place.title}
            </h2>
            <h3 className="mb-4 text-xl font-semibold text-secondary">
              {place.address}
            </h3>
            <p className="mb-2 text-lg text-primary">{place.description}</p>
          </div>
          <div className="p-4 text-center mx-5 border-t-[#ccc] border-t-4">
            <Button inverse animate onClick={openMapHandler} className="m-2">
              VIEW ON MAP
            </Button>
            {authContext?.uid === place.creator && (
              <>
                <Button animate to={`/places/${id}`} className="m-2">
                  EDIT
                </Button>
                <Button
                  onClick={showDeleteHandler}
                  animate
                  danger
                  className="m-2"
                >
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
