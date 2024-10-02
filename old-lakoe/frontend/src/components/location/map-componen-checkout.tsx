import { Route } from "@/routes/buyer/checkout";
import useStore from "@/z-context";
import Axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { IoIosPin } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "tailwindcss/tailwind.css";
import { Button } from "../button";
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
import { api } from "@/lib/api";

interface Items {
  name: string;
}

interface RatesTypes {
  destination_latitude: number | undefined;
  destination_longitude: number | undefined;
  items: Items[];
}

interface paramsTypes {
  id: number;
}

const MapComponentCheckout = (props: any) => {
  const [markerPosition] = useState<[number, number]>([-6.381821, 106.749643]);
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const markerRef = useRef<L.Marker<any>>(null);

  const updatePosition = async (latLng: L.LatLng) => {
    setPosition(latLng);
    props.form?.setValue("receiver_latitude", latLng.lat.toString());
    props.form?.setValue("receiver_longitude", latLng.lng.toString());
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

  //   const handleMarkerDragEnd = (event: L.LeafletEvent) => {
  //     const marker = event.target;
  //     const position = marker.getLatLng();
  //     setMarkerPosition([position.lat, position.lng]);
  //   };

  const setCourier = useStore((state) => state.setCourier);

  const params: paramsTypes = Route.useSearch();

  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    async function getId() {
      try {
        const response = await Axios({
          method: "get",
          url: `${api}/cart-items/${params.id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // console.log("cari id", response.data);
        setName(response.data.name);
        setId(response.data.store_id);
      } catch (error) {
        console.log(error);
      }
    }
    getId();
  }, []);

  // const [dataGetRates, setDataGetRates] = useState<RatesTypes>({
  //   destination_latitude: 0,
  //   destination_longitude: 0,
  //   items: [],
  // });

  async function hitRates() {
    try {
      const dataItems: Items[] = [
        {
          name: name,
        },
      ];

      const data: RatesTypes = {
        destination_latitude: position?.lat,
        destination_longitude: position?.lng,
        items: dataItems,
      };

      console.log("hit");

      const response = await Axios({
        method: "post",
        url: `${api}/buyers/rates/${id}`,
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("ini rates", response.data.courier);
      setCourier(response.data.courier);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <Label htmlFor="alamat">Pin Alamat</Label>
      <div className="p-3 shadow bg-slate-800 rounded-md flex justify-around items-center text-white">
        {!address ? (
          <div className="flex gap-3 items-center">
            <IoIosPin className="text-2xl" />
            <p>Silakan pilih alamat dengan pin point</p>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <IoIosPin className="text-2xl" />
            <p>{address}</p>
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-slate-800 shadow hover:bg-slate-200 hover:text-black">
              Ubah Pin Point
            </Button>
          </DialogTrigger>
          <DialogContent className="text-sm sm:max-w-[600px]">
            <DialogHeader className="border-b-2 py-3">
              <DialogTitle>Tandai Pin Point</DialogTitle>
            </DialogHeader>

            <div className="p-3 border border-gray-300 bg-orange-100 rounded-md flex gap-3 items-center">
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

            <div className="flex gap-3 items-center text-slate-800">
              <IoIosPin className="text-2xl" />
              <p>{address}</p>
            </div>

            <div className="flex gap-5 justify-center">
              <Button
                className="w-5/12 bg-white text-slate-800 shadow border-gray-300 border hover:bg-slate-200 hover:text-black"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Kembali
              </Button>
              <Button
                className="w-5/12 bg-orange-500 text-white hover:bg-orange-300 hover:text-white border-gray-300 border"
                onClick={hitRates}
              >
                Pilih Lokasi
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MapComponentCheckout;
