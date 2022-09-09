import React from "react";
import { twMerge } from "tailwind-merge";
import { latLng } from "../../models/PlaceModel";

interface Props {
  className?: string;
  center: latLng;
  zoom: number;
}

const Map: React.FC<Props> = ({ className, center, zoom }) => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current!, {
      center,
      zoom,
    });

    new window.google.maps.Marker({ position: center, map });
  }, [center, zoom]);

  return (
    <div className={twMerge(`w-full h-full ${className}`)} ref={mapRef}></div>
  );
};

export default Map;
