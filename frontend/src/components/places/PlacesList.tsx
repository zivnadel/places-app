import Button from "../ui/form-elements/Button";
import Card from "../ui/Card";
import PlaceItem from "./PlaceItem";

interface Props {
  items: any;
}

const PlacesList: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <Card className="text-center w-[90%] md:w-[50%]">
          <h2 className="font-bold text-3xl text-secondary">
            No places found. Maybe create one?
          </h2>
          <Button className="mt-5" to="/places/new">
            Share Place
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="list-none my-4 mx-auto p-0 w-[90%] max-w-[40rem]">
      {items.map((place: any) => (
        <PlaceItem key={place.id} id={place.id} place={place}></PlaceItem>
      ))}
    </ul>
  );
};

export default PlacesList;
