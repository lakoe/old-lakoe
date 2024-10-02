import React from "react";
import { Button, buttonVariants } from "@/components/button";
import { UpdateLocation } from "@/components/EditLocationDialog";
import type { Location } from "@/datas/type";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

interface LocationCardProps {
  location: Location;
  onDelete: (id: number) => void;
  onEdit: (location: Location) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onDelete,
  onEdit,

}) => {
  const { namaLokasi, alamat, selectedProvinsiId, pinPoint } = location

  const openStreetMap = `https://www.openstreetmap.org/directions?from=${pinPoint[0]}%2C%20${pinPoint[1]}#map=5/-6.403/99.053`


  return (
    <>
      <div className="border rounded p-5 flex justify-between items-start m-3">
        <div className="w-full">
          <p>
            <strong>Nama Lokasi:</strong> {namaLokasi}{" "}
            <span className="bg-green-200 text-green-800 py-1 px-2 rounded">
              Alamat Utama
            </span>
          </p>
          <p>
            <strong>Alamat:</strong> {alamat}
          </p>
          <p>
            <strong>Kota/Kecamatan:</strong> {selectedProvinsiId}
          </p>
          <p>
            <strong>Pinpoint:</strong>{" "}
            <a href={openStreetMap} className="text-blue-600">
              Sudah Pinpoint
            </a>
          </p>
        </div>
        <div className="flex">
          <div>
            <UpdateLocation
              location={location}
              onUpdate={() => onEdit(location)}
            // onSave={handleSave}
            // variant="ghost"
            />
          </div>
          <div className="mt-5">
            <Dialog>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Location</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete location data ?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="outline" >No</Button>
                  </DialogClose>
                  <Button className={buttonVariants({ variant: 'custom', className: "rounded-xl" })} onClick={() => onDelete(location.id)}>
                    Yes, Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
              <DialogTrigger asChild>
                <Button className={buttonVariants({ variant: 'custom', className: "rounded-xl" })}>Delete</Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </div >
    </>
  );
};