export interface latLng {
  lat: number;
  lng: number;
}

export default interface Place {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: latLng;
}
