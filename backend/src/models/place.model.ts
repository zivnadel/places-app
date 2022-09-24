import mongoose from "mongoose";
export interface latLng {
  lat: number;
  lng: number;
}

export interface IPlace {
  id?: string;
  title: string;
  description: string;
  address: string;
  location: latLng;
  imageUrl: string;
  creator: string;
}

const placeSchema = new mongoose.Schema<IPlace>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  imageUrl: { type: String, required: true },
  creator: { type: String, required: true },
});

export default mongoose.model<IPlace>("Place", placeSchema);
