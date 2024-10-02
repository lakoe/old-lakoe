import { api } from "@/lib/api";
import useStore from "@/z-context";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dataDaerah from "../assets/data-daerah/data-daerah.json";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import MapComponentAddLocation from "./location/map-componen-add-location";
import { useMutation } from "@tanstack/react-query";

type locationForm = {
  name: string;
  address: string;
  postal_code: number;
  city_district: string;
  lattitude: string;
  longitude: string;
  store_id: string;
};

const locationSchema = z.object({
  name: z.any(),
  address: z.any(),
  postal_code: z.any(),
  city_district: z.any(),
  lattitude: z.any(),
  longitude: z.any(),
  store_id: z.any(),
});

export const useLocationForm = () => {
  const form = useForm<locationForm>({
    mode: "onChange",
    resolver: zodResolver(locationSchema),
  });

  return form;
};

export function AddLocation() {
  const formLocation = useLocationForm();

  const user = useStore((state) => state.user);
  // console.log("ini user", user);

  formLocation.setValue("store_id", user.store_id);

  const addLocation = useMutation({
    mutationFn: async (newData: any) => {
      return await Axios({
        method: "post",
        url: `${api}/users/location`,
        data: newData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
  });

  async function onSubmitForm(data: any) {
    try {
      console.log("hahaha hit");

      const newData = {
        ...data,
      };

      // const response = await Axios({
      //   method: "post",
      //   url: `${api}/users/location`,
      //   data: newData,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // });

      await addLocation.mutateAsync(newData);
    } catch (error) {
      console.log(error);
    }
  }

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
                <Button>Tambah Lokasi</Button>
              </DialogTrigger>
            </div>
          </div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambahkan Lokasi Baru</DialogTitle>
              <DialogDescription>Tambahkan Lokasi Baru Toko.</DialogDescription>
            </DialogHeader>
            <form onSubmit={formLocation.handleSubmit(onSubmitForm)}>
              <div className="grid gap-4 py-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="namaLokasi" className="text-left">
                    Nama Lokasi
                  </Label>
                  <Input
                    id="namaLokasi"
                    className="flex w-64"
                    {...formLocation.register("name")}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="alamat" className="text-left">
                    Alamat
                  </Label>
                  <Input
                    id="alamat"
                    className="flex w-64"
                    {...formLocation.register("address")}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="kota" className="text-left">
                      Provinci/Kota
                    </Label>
                  </div>
                  <div className="flex w-64">
                    <Select
                      onValueChange={(e) =>
                        formLocation.setValue("city_district", e)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Your Provinci/Kota" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataDaerah.map((provinsi: any) => {
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
                <div className="flex justify-between items-center">
                  <Label htmlFor="kodepos" className="text-left">
                    Kode Pos
                  </Label>
                  <Input
                    id="kodepos"
                    className="flex w-64"
                    {...formLocation.register("postal_code")}
                  />
                </div>

                <div className="flex-col justify-between items-center">
                  <MapComponentAddLocation form={formLocation} />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}
