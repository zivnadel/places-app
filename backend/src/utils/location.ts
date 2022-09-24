import axios from "axios";
import dotenv from "dotenv";
import HttpError from "../models/HttpErrorModel";

dotenv.config();

const getCoordsByAddress = async (address: string) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE_API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError(
      "Could not find location for the specified address.",
      422
    );
  }

  const coords = data.results[0].geometry.location;

  return coords;
};

export default getCoordsByAddress;
