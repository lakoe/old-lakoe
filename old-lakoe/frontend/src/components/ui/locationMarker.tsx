import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

const LocationMarker = () => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom()); // Memindahkan tampilan peta ke lokasi pengguna
    },
    click(e) {
      setPosition(e.latlng); // Menyimpan posisi klik ke state
    },
  });

  // Meminta lokasi pengguna saat pertama kali komponen dimuat
  useEffect(() => {
    map.locate();
  }, [map]);

  console.log("ini positition", position)

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;