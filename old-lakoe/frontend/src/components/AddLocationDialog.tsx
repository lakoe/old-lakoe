import { LocationContext } from "@/context/LocationContext";
import { Location } from "@/datas/type";
import { useContext, useEffect, useState } from "react";
import { Button, buttonVariants } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import MapComponent from "./location";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import dataDaerah from "../assets/data-daerah/data-daerah.json";

interface DialogProps {
  onSave: (location: Location) => void;
}

interface Regencies {
  id: string;
  province_id: string;
  name: string;
  alt_name: string;
  latitude: number;
  longitude: number;
  // districts?: Districts[];
}

export const AddLocation: React.FC<DialogProps> = ({ onSave }) => {
  const context = useContext(LocationContext);

  const [namaLokasi, setNamaLokasi] = useState("");
  const [alamat, setAlamat] = useState("");
  // const [kota, setKota] = useState("");
  // const [kodePos, setKodePos] = useState("");
  const [pinPoint, setPinPoint] = useState<[number, number]>([
    -6.381870411756581, 106.74959499999997,
  ]);
  const [selectedProvinsiId, setSelectedProvinsiId] = useState<string>("");

  if (!context) {
    return null;
  }

  const { locations, setLocations } = context;

  const handleSave = () => {
    const newLocation: Location = {
      id: Date.now(),
      namaLokasi,
      alamat,
      selectedProvinsiId,
      // kodePos,
      pinPoint: pinPoint,
    };
    // useEffect(() => {
    //   if (selectedProvinsiId) {
    //     const provinsi =
    //       dataDaerah.find((data) => selectedProvinsiId === data.id)?.regencies ||
    //       [];
    //     console.log(provinsi);
    //     setSelectedProvinsiId(provinsi);
    //   }
    // }, [selectedProvinsiId])

    console.log(newLocation);

    setLocations([...locations, newLocation]);
    setNamaLokasi("");
    setAlamat("");
    setSelectedProvinsiId("");
    // setKodePos("");
    setPinPoint([-6.381870411756581, 106.74959499999997]);
    onSave(newLocation);
  };

  return (
    <>
      <Dialog>
        <div className=" bg-white">
          <div className="flex">
            <div className="mt-3 mb-5 w-full flex flex-col">
              <Label className="font-bold text-xl">Lokasi Toko</Label>
              <Label className="text-xl">
                Alamat toko ini akan digunakan sebagai alamat pengirimanmu
              </Label>
            </div>
            <div className="mt-3">
              <DialogTrigger>
                <Button
                  className={buttonVariants({
                    variant: "customRGBA",
                    className: "rounded-xl",
                  })}
                >
                  Tambah Lokasi1
                </Button>
              </DialogTrigger>
            </div>
          </div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambahkan Lokasi Baru</DialogTitle>
              <DialogDescription>Tambahkan Lokasi Baru Toko.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="namaLokasi" className="text-left">
                  Nama Lokasi
                </Label>
                <Input
                  id="namaLokasi"
                  name="namaLokasi"
                  value={namaLokasi}
                  onChange={(e) => setNamaLokasi(e.target.value)}
                  className="flex w-64"
                />
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="alamat" className="text-left">
                  Alamat
                </Label>
                <Input
                  id="alamat"
                  name="alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="flex w-64"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="kota" className="text-left">
                    Kota/Kecamatan
                  </Label>
                </div>
                <div className="flex w-64">
                  <Select onValueChange={(id) => setSelectedProvinsiId(id)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Your Kota/Kecamatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataDaerah.map((provinsi) => {
                        return (
                          <SelectItem key={provinsi.id} value={provinsi.name}>
                            <p className="text-black">{provinsi.name}</p>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* <Input
                  id="kota"
                  name="kota"
                  value={kota}
                  onChange={(e) => setKota(e.target.value)}
                  className="flex w-64"
                /> */}
              {/* <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="kodePos" className="text-left">
                      Kode Pos
                    </Label>
                  </div>
                  <div className="flex w-64">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Your Kode Pos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Kode Pos</SelectLabel>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                  id="kodePos"
                  name="kodePos"
                  value={kodePos}
                  onChange={(e) => setKodePos(e.target.value)}
                  className="flex w-64"
                />
                </div> */}
              <div className="flex-col justify-between items-center">
                <MapComponent
                  markerPosition={pinPoint}
                  setMarkerPosition={setPinPoint}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button
                  className={buttonVariants({
                    variant: "customRGBA",
                    className: "rounded-xl",
                  })}
                  onClick={handleSave}
                >
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};
