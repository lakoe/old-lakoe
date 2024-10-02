import { Button } from "@/components/button";
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
import { useEffect, useState } from "react";
import Axios from "axios";
import { api } from "@/lib/api";
import useStore from "@/z-context";
import { UpdateLocation } from "./EditLocationDialog copy";
import { Switch } from "./switch";
import { Label } from "./label";
import { useMutation, useQuery } from "@tanstack/react-query";

type locationForm = {
  name: string;
  address: string;
  postal_code: number;
  city_district: string;
  lattitude: string;
  Longitude: string;
};

export function LocationCard() {
  const user = useStore((state) => state.user);

  const [location, setLocation] = useState([]);
  const [active, setActive] = useState<boolean>(false);

  const { refetch, data: locationData } = useQuery({
    queryKey: ["addressList"],
    queryFn: fetchDataLocation,
  });

  async function fetchDataLocation() {
    const response = await Axios({
      method: "get",
      url: `${api}/users/location/${user.store_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setLocation(response.data);
    console.log("data lokasi", location);
  }

  useEffect(() => {
    refetch();
  }, [locationData]);

  useEffect(() => {
    async function fetchDataLocation() {
      const response = await Axios({
        method: "get",
        url: `${api}/users/location/${user.store_id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLocation(response.data);
      console.log("data lokasi", location);
    }
    fetchDataLocation();
  }, []);

  const mainAddress = useMutation({
    mutationFn: async (id: string) => {
      return await Axios({
        method: "post",
        url: `${api}/users/location/active/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
  });

  const deleteDataLocation = useMutation({
    mutationFn: async (id: string) => {
      try {
        return await Axios({
          method: "delete",
          url: `${api}/users/location/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      {location.map((data: any) => {
        return (
          <div className="border rounded p-5 flex justify-between">
            <div className="w-full">
              <p>
                <strong>Nama Lokasi:</strong> {data.name}
              </p>
              <p>
                <strong>Alamat:</strong> {data.address}
              </p>
              <p>
                <strong>Kota/Kecamatan:</strong> {data.city_district}
              </p>
              <p>
                <strong>Pinpoint:</strong>{" "}
                <a
                  href={`https://www.openstreetmap.org/directions?from=${data.lattitude}%2C%20${data.Longitude}#map=5/-6.403/99.053`}
                  className="text-blue-600"
                >
                  Sudah Pinpoint
                </a>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={data.is_main_location}
                  id="alamat"
                  onClick={async () => {
                    await mainAddress.mutateAsync(data.id);
                    refetch();
                  }}
                />
                <Label htmlFor="alamat">Alamat Utama</Label>
              </div>

              <UpdateLocation data={data.id} />

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
                      <Button variant="outline">No</Button>
                    </DialogClose>
                    <Button
                      onClick={async () => {
                        // console.log("ini id yang akan dihapus", data.id);
                        await deleteDataLocation.mutateAsync(data.id);
                        refetch();
                      }}
                    >
                      Yes, Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
                <DialogTrigger asChild>
                  <Button>Delete</Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        );
      })}
    </>
  );
}
