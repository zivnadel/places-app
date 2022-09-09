import RoundedButton from "../ui/form-elements/RoundedButton";
import Card from "../ui/Card";
import PlaceItem from "./PlaceItem";

interface Props {
  items: any;
}

const PlacesList: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div>
        <Card className="text-center">
          <h2 className="font-bold text-3xl text-secondary">
            No places found. Maybe create one?
          </h2>
          <RoundedButton className="mt-5">Share Place</RoundedButton>
        </Card>
      </div>
    );
  }

  return (
    <ul className="list-none my-4 mx-auto p-0 w-[90%] max-w-[40rem]">
      {items.map((place: any) => (
        <PlaceItem key={place.id} place={place}></PlaceItem>
      ))}
    </ul>
  );
};

export default PlacesList;
