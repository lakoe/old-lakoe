/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import "@/dialog/styles.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { Button, buttonVariants } from "./button";
import { Input } from "./input";
import { Label } from "./label";

// Fix Leaflet's default icon paths
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

export const MapComponent: React.FC<{
  setLocation: (location: L.LatLng) => void;
}> = ({ setLocation }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setLocation(e.latlng);
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export const LokasiTokoHeaders: React.FC = () => {
  const [location, setLocation] = useState<L.LatLng | null>(null);

  const handleSave = () => {
    console.log("Location saved:", location);
  };

  return (
    <>
      <div className="w-screen inline-flex">
        <div className="mt-3 mb-5 w-screen flex flex-col">
          <Label className="font-bold text-xl">Lokasi Toko</Label>
          <Label className="mt-3 font-medium text-gray-400">
            Alamat akan digunakan sebagai alamat pengirimanmu
          </Label>
        </div>
        <div className="mt-5 mr-10">
          <Dialog>
            <DialogTrigger>
              <Button
                className={buttonVariants({
                  variant: "custom",
                })}
              >
                Tambah Lokasi
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambahkan Lokasi Baru</DialogTitle>
                <DialogDescription>
                  Tambahkan Lokasi Baru Toko.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="namaLokasi" className="text-right">
                    Nama Lokasi
                  </Label>
                  <Input
                    id="namaLokasi"
                    defaultValue="Nama Lokasi"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alamat" className="text-right">
                    Alamat
                  </Label>
                  <Input
                    id="alamat"
                    defaultValue="Alamat"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kotKec" className="text-right">
                    Kota/Kecamatan
                  </Label>
                  <Input
                    id="kotKec"
                    defaultValue="Kota/Kecamatan"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kodePos" className="text-right">
                    Kode Pos
                  </Label>
                  <Input
                    id="kodePos"
                    defaultValue="Kode Pos"
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="items-center">
                <Label className="text-right">
                  Pinpoint Lokasi
                  <DialogDescription className="text-left">
                    Tandai Lokasi Untuk Mempermudah Permintaan Pickup Kurir.
                  </DialogDescription>
                </Label>
                <MapComponent setLocation={setLocation} />
              </div>
              <DialogFooter>
                <Button
                  className={buttonVariants({
                    variant: "custom",
                  })}
                  type="submit"
                  onClick={handleSave}
                  disabled={!location}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};
