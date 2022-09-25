import Place from "./PlaceModel";

export default interface User {
  id: string;
  name: string;
  image: string;
  places: Place[];
}
