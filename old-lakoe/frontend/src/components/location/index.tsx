import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { IoIosPin } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "tailwindcss/tailwind.css";
import { Button, buttonVariants } from "../button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Label } from "../label";
import { getAddress } from "./geoCoding";
import { SearchControl } from "./search";
import { DialogClose } from "@radix-ui/react-dialog";

// const ChangeView = ({ center }: { center: [number, number] }) => {
//   const map = useMap();
//   map.setView(center);
//   return null;
// };

const MapComponent = (props: any) => {
  const [markerPosition] = useState<[number, number]>([-6.381821, 106.749643]);

  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const markerRef = useRef<L.Marker<any>>(null);

  const updatePosition = async (latLng: L.LatLng) => {
    setPosition(latLng);
    const address = await getAddress(latLng.lat, latLng.lng);
    setAddress(address);
  };

  useEffect(() => {
    const success = async (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      const latLng = new L.LatLng(latitude, longitude);
      await updatePosition(latLng);
    };

    const error = (error: GeolocationPositionError) => {
      console.error(error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, error);
    } else {
      console.error("Not Supported");
    }
  }, []);

  const onDrag = async () => {
    const marker = markerRef.current;
    if (marker != null) {
      const latLng = marker.getLatLng();
      await updatePosition(latLng);
    }
  };

  console.log(position);

  //   const handleMarkerDragEnd = (event: L.LeafletEvent) => {
  //     const marker = event.target;
  //     const position = marker.getLatLng();
  //     setMarkerPosition([position.lat, position.lng]);
  //   };

  return (
    <div className="w-full">
      <Label htmlFor="alamat">Pin Alamat</Label>
      <div className="p-3 border border-blue-900 bg-blue-100 rounded-md flex justify-around items-center">
        <div className="flex gap-3 items-center">
          <IoIosPin className="text-2xl" />
          <p>{address}</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-white text-blue-500 border border-blue-900 hover:bg-blue-200 hover:text-black">
              Ubah Pin Point
            </Button>
          </DialogTrigger>
          <DialogContent className="text-sm sm:max-w-[600px]">
            <DialogHeader className="border-b-2 py-3">
              <DialogTitle>Tandai Pin Point</DialogTitle>
            </DialogHeader>

            <div className="p-3 border border-blue-900 bg-blue-100 rounded-md flex gap-3 items-center">
              <IoWarning />
              <p>Pastikan pin point lokasi sesuai dengan alamat!</p>
            </div>

            <div>
              <MapContainer
                className="sm:max-w-[600px] h-[400px]"
                center={markerPosition}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {position && (
                  <Marker
                    position={position}
                    draggable={true}
                    eventHandlers={{ dragend: onDrag }}
                    ref={markerRef}
                  >
                    <Popup>Pilih Lokasi Anda</Popup>
                  </Marker>
                )}
                {/* <ChangeView center={markerPosition} /> */}
                <SearchControl setPosition={updatePosition} />
              </MapContainer>
            </div>

            <div className="flex gap-3 items-center text-blue-500">
              <IoIosPin className="text-2xl" />
              <p>{address}</p>
            </div>

            <div className="flex gap-5 justify-center">
              <DialogClose>
                <Button className={buttonVariants({
                  variant: "custom",
                  className: "rounded-xl",
                })}>
                  Kembali
                </Button>
              </DialogClose>
              <DialogClose>
                <Button className={buttonVariants({
                  variant: "custom",
                  className: "rounded-xl",
                })}>
                  Pilih Lokasi
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MapComponent;
