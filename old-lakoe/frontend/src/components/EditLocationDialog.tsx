import React, { useContext, useState } from 'react';
import { LocationContext } from '@/context/LocationContext';
import { Location } from '@/datas/type';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button, buttonVariants } from './button';
import { Label } from './label';
import { Input } from './input';
import MapComponent from './location';

interface UpdateLocationProps {
  location: Location;
  onUpdate: (updatedLocations: Location) => void;
}
export const UpdateLocation: React.FC<UpdateLocationProps> = ({ location, onUpdate }) => {
  const context = useContext(LocationContext);

  const [namaLokasi, setNamaLokasi] = useState(location.namaLokasi);
  const [alamat, setAlamat] = useState(location.alamat);
  const [kota, setKota] = useState(location.kota);
  const [kodePos, setKodePos] = useState(location.kodePos);
  const [pinPoint, setPinPoint] = useState(location.pinPoint);

  if (!context) {
    return null;
  }

  const { locations, setLocations } = context;

  console.log(locations)

  const handleUpdate = () => {
    const updatedLocations = locations.map(loc =>
      loc.id === location.id ? { ...loc, namaLokasi, alamat, kota, kodePos, pinPoint } : loc
    );

    setLocations(updatedLocations);
  };

  return (
    <div className="mt-5">
      <Dialog>
        <div className="flex justify-between bg-slate-50 mr-2 mb-5">
          <DialogTrigger>
            <Button className={buttonVariants({ variant: 'custom', className:"rounded-xl" })} >Edit Location</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Lokasi</DialogTitle>
              <DialogDescription>Edit Lokasi Toko.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="namaLokasi" className="text-right">
                  Nama Lokasi
                </Label>
                <Input
                  id="namaLokasi"
                  name="namaLokasi"
                  value={namaLokasi}
                  onChange={(e) => setNamaLokasi(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="alamat" className="text-right">
                  Alamat
                </Label>
                <Input
                  id="alamat"
                  name="alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="kota" className="text-right">
                  Kota/Kecamatan
                </Label>
                <Input
                  id="kota"
                  name="kota"
                  value={kota}
                  onChange={(e) => setKota(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="kodePos" className="text-right">
                  Kode Pos
                </Label>
                <Input
                  id="kodePos"
                  name="kodePos"
                  value={kodePos}
                  onChange={(e) => setKodePos(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="flex-col justify-between items-center">
                <Label htmlFor="pinpoint" className="text-left">
                  Pinpoint Lokasi
                </Label>
                <MapComponent markerPosition={pinPoint} setMarkerPosition={setPinPoint} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button className={buttonVariants({ variant: 'custom', className:"rounded-xl" })} onClick={handleUpdate}>Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};