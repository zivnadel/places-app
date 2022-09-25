import mongoose from "mongoose";
export interface latLng {
  lat: number;
  lng: number;
}
export interface IPlace extends mongoose.Document {
  id?: string;
  title: string;
  description: string;
  address: string;
  location: latLng;
  imageUrl: string;
  creator: mongoose.Types.ObjectId;
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
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default mongoose.model<IPlace>("Place", placeSchema);
