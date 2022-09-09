import Place from "../../models/PlaceModel";
import RoundedButton from "../ui/form-elements/RoundedButton";
import React from "react";
import Card from "../ui/Card";
import Modal from "../ui/Modal";

interface Props {
  place: Place;
  id?: string;
}

const PlaceItem: React.FC<Props> = ({ place, id }) => {
  const [showMap, setShowMap] = React.useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        heading={place.address}
        contentClasses="p-0"
        footerClasses="m-2"
        footer={<RoundedButton onClick={closeMapHandler}>Close</RoundedButton>}
      >
        <div className="h-80 w-full">
          <h2>THE MAP!</h2>
        </div>
      </Modal>
      <li className="my-4 mx-0">
        <Card className="p-0">
          <div className="w-full h-[12.5rem] mr-6 md:h-80">
            <img
              className="w-full h-full object-cover"
              src={place.imageUrl}
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
            <RoundedButton
              inverse
              animate
              onClick={openMapHandler}
              className="m-2"
            >
              VIEW ON MAP
            </RoundedButton>
            <RoundedButton animate to={`/places/${id}`} className="m-2">
              EDIT
            </RoundedButton>
            <RoundedButton animate danger className="m-2">
              DELETE
            </RoundedButton>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
