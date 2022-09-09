import { useParams } from "react-router-dom";
import PlacesList from "../components/places/PlacesList";
import Place from "../models/PlaceModel";

const DUMMY_PLACES: Place[] = [
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

const UserPlaces: React.FC = () => {
  const { uid } = useParams();
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === uid);

  return <PlacesList items={loadedPlaces}></PlacesList>;
};

export default UserPlaces;
