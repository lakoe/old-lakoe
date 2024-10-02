// ======================================================================================================
"use client";
import { Button, buttonVariants } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import { HeaderLogoToko } from "./headerPengaturan";
import { z } from "zod";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Informasi } from "@/datas/type";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/use-toast";
import useStore from "@/z-context";
import Axios from "axios";
import { api } from "@/lib/api";
import { useForm } from "react-hook-form";
import { BsImage, BsTrash } from "react-icons/bs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/routes/__root";

// const informasiSchema = z.object({
//   name: z.string({ message: "nama Tidak boleh kosong" }).max(50),
//   slogan: z.string({ massage: "slogan Tidak boleh kosong" }).min(2).max(50),
//   description: z.array({ massage: "description Tidak boleh kosong" }).max(50),
// })

type formData = {
  name: string;
  slogan: string;
  description: string;
  logo_attachment: string;
};

type store = {
  store: formData;
};

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export const FormInformasiToko: React.FC = () => {
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  // State untuk menyimpan nilai dari input, textarea, dan file
  const [formData, setFormData] = useState<formData>();
  const token = localStorage.getItem("token");
  const [preview, setPreview] = useState("");
  const [userStore, setUserStore] = useState<formData>();

  // const userMutate = useMutation({
  //   mutationFn: async (cart_id) => {
  //     return await Axios({
  //       method: "delete",
  //       url: `${api}/cart-items/${cart_id}`,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //   },
  // });

  // const { refetch: refetchUser } = useQuery({
  //   queryKey: ["userData"],
  //   queryFn: getUser,
  // });

  async function getUser() {
    try {
      const response = await Axios({
        method: "get",
        url: `${api}/users/stores/${user.store_id}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserStore(response.data);
      setPreview(response.data.logo_attachment);
      // console.log(auth.data);
    } catch (err) {
      toast({
        variant: "destructive",
        title: `Error!`,
      });
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const response = await Axios({
          method: "get",
          url: `${api}/users/stores/${user.store_id}`,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("store", response.data);
        setUserStore(response.data);
        setPreview(response.data.logo_attachment);
        // console.log(auth.data);
      } catch (err) {
        toast({
          variant: "destructive",
          title: `Error!`,
        });
      }
    }
    getUser();
  }, []);

  const formDatas = useForm<formData>();
  useEffect(() => {
    if (userStore) {
      formDatas.reset({
        slogan: userStore.slogan,
        name: userStore.name,
        description: userStore.description,
      });
    }
  }, [userStore, formDatas.reset]);
  async function onSubmit(data: formData) {
    try {
      console.log("data", data);
      let dataForm = new FormData();

      dataForm.append("name", data.name);
      dataForm.append("slogan", data.slogan);
      dataForm.append("description", data.description);
      dataForm.append("logo_attachment", data.logo_attachment[0]);
      const response = await Axios({
        method: "patch",
        url: `${api}/users/stores/${user.store_id}`,
        data: dataForm,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(response.data);
      setFormData(response.data);
      await getUser();
      toast({
        variant: "success",
        title: `Informasi Updated!`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Error!`,
        description: `${error.message}`,
      });
      console.log(error);
    }
  }
  return (
    <form onSubmit={formDatas.handleSubmit(onSubmit)} className="bg-white">
      <div>
        <div className="flex gap-9">
          <div className="mt-3">
            <div className="flex-col">
              <Label className="py-10">Selogan</Label>
              <Input
                id="slogan"
                placeholder="Buat Selogan Untuk Toko"
                className="mt-3 mb-3 w-96"
                defaultValue={userStore?.slogan}
                {...formDatas.register("slogan")}
              ></Input>
              <Label>Nama Toko</Label>
              <Input
                id="name"
                className="mt-3 mb-3 w-96"
                defaultValue={userStore?.name}
                {...formDatas.register("name")}
              ></Input>
            </div>
          </div>
          <div className="flex-col mr-10 mt-3 w-full">
            <div>
              <Label className="py-10">Deskripsi</Label>
              <Textarea
                id="description"
                className="mt-3 mb-5"
                defaultValue={userStore?.description}
                {...formDatas.register("description")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mr-10 border-b pb-5">
          {formDatas.formState.isSubmitting ? (
            <Button
              type="submit"
              className={buttonVariants({
                variant: "custom",
                className: "rounded-xl",
              })}
              disabled
            >
              Simpan
              <LoadingSpinner />
            </Button>
          ) : (
            <Button
              type="submit"
              className={buttonVariants({
                variant: "custom",
                className: "rounded-xl",
              })}
            >
              Simpan
            </Button>
          )}
        </div>
        <HeaderLogoToko />
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label
              htmlFor="logo_attachment"
              className="relative text-gray-400 focus-within:text-gray-800 block"
            >
              <Input
                id="logo_attachment"
                type="file"
                {...formDatas.register("logo_attachment")}
                className="w-32 h-32 text-transparent"
                onChange={(event) => {
                  const { files, displayUrl } = getImageData(event);
                  setPreview(displayUrl);
                }}
              ></Input>
              {preview ? (
                <div>
                  <img
                    src={preview}
                    className="absolute inset-0 w-32 h-32 object-contain"
                  />
                  <BsTrash
                    className="absolute z-1 inset-0 text-xl text-red-600 font-bold m-2"
                    onClick={() => {
                      {
                        formDatas.unregister("logo_attachment");
                      }
                      setPreview("");
                    }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX09PTMzMzJycnPz8/d3d3V1dXi4uLo6Ojw8PDx8fH39/ft7e3Y2NjQ0NDp6enb29uHE20LAAACaklEQVR4nO3b6W6CQBhGYUTWD9T7v9uylLIN6jCk8Cbn+deEGo6DMOAYRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJyFiuzshLesStJAdVZdufEV38LFydkZm6w+IrBJrK86itkxgU1ifnaKmz363QvUvsbjmoNYdjuXPPMQz6R7lfLsGKeq3bd76LvfHwnFIXt0tOKYwjuF51kVtjMUbzqFVmR1/cpK30idwv7qH98yz0SVwvI+XP19JygqhY9xehMnXokihfl0/hZ77a5I4WM2zXz5DKJI4XwKvjHLNGeGRmE1L7w7N7fKeRLSKCy+KGwCnedZjcJofruXuo7SbpwdiRqFlk4D42y9rf0eyOtEjcL5BzFeb2rV5oRApNAmj6QcjyRs8g4sE0UKJ4nxemJq8yGeJ6oURpY/uic26frppy0uJvNEmcI2JM/yovlz8cxlGbhIFCrcsA6cX0/kC52Bt3hMlC90Bk5HUbzQPYL9KA6b6BXmk8/YZuCYqFdYj/f47wL/EtUKrR6/LXsfOCSKFbaBQ+KnwGa79sqpVWjp7x1Ec6B+DhQsHAK7xM+BeoVjYLPzr499eoXTwO+IFfoHihXuWbWgVVh792kV7lt3IlRoe0ZQqvCLax+FZ8c4UUghheebFu6jU1gk++gU7l3t3f2rRmGAyxcGr329cuEh60stunBh2Z3y6yxM/wX52S1u/bf3Ryzzdq9tuIDnYWv1q7NTNlhy0O8t/Nb6/SfLbnHoYbpjSep/sjLfOZ0ZXfTXJKPgH69deAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDyA0uAKIxQw0bjAAAAAElFTkSuQmCC"
                    className="absolute inset-0 w-32 h-32 object-cover"
                  />
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
