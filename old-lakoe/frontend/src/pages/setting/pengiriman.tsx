import { useToast } from "@/components/use-toast";
import useStore from "@/z-context";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DialogKurir } from "./component/dialogKurir";
import { api } from "@/lib/api";
import { Button } from "@/components/button";
import { BsTrash } from "react-icons/bs";
import { useMutation, useQuery } from "@tanstack/react-query";

export type kurir = {
  courier_code: string;
  courier_service_name: string;
  file: any;
};

export function PengirimanPages() {
  const form = useForm();
  const user = useStore((state) => state.user);
  const [kurir, setKurir] = useState([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { refetch: refetchKurir } = useQuery({
    queryKey: ["kurirList"],
    queryFn: fetchKurir,
  });

  async function onSubmit(values: kurir) {
    console.log(values);
    const dataForm = new FormData();

    dataForm.append("courier_code", values.courier_code);
    dataForm.append("courier_name", values.courier_service_name);
    if (values.file) dataForm.append("file", values.file[0]);
    console.log(dataForm.get("file"));
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const response = await Axios({
        method: "post",
        url: `${api}/form-produk/add/kurir/${user.id}`,
        data: dataForm,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data);
      setOpen(false);
      await refetchKurir();
    } catch (error: any) {
      console.log("error", error);
      toast({
        variant: "destructive",
        title: `Error! ${error.response.status}`,
        description: `${error.message}`,
      });
    }
  }

  async function deleteCourier(id: string) {
    const response = await Axios({
      method: "delete",
      url: `${api}/form-produk/delete/kurir/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  useEffect(() => {
    async function fetchKurir() {
      const response = await Axios({
        method: "get",
        url: `${api}/form-produk/get/kurir/${user.id}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.courier_list);
      setKurir(response.data.courier_list);
    }
    fetchKurir();
  }, []);

  async function fetchKurir() {
    const response = await Axios({
      method: "get",
      url: `${api}/form-produk/get/kurir/${user.id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data.courier_list);
    setKurir(response.data.courier_list);
  }

  const deleteKurir = useMutation({
    mutationFn: async (id: string) => {
      return await Axios({
        method: "delete",
        url: `${api}/form-produk/delete/kurir/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
  });

  const addKurir = useMutation({
    mutationFn: async (id: string) => {
      return await Axios({
        method: "delete",
        url: `${api}/form-produk/delete/kurir/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
  });

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm shadow-black h-full w-full p-4">
        <h1 className="text-2xl w-full font-bold mt-2 ms-2 mb-8">
          Pilih Pengiriman
        </h1>
        <div className=" flex flex-wrap justify-start">
          {kurir &&
            kurir.map((val: any, index: number) => (
              <div
                className="border-2 w-5/12 flex items-center justify-between m-2 p-4 rounded-lg h-24"
                key={index}
              >
                <div className="flex gap-2 justify-center">
                  <img src={val.logo} className="w-16 me-4"></img>
                  <div className="flex flex-col">
                    <h1 className="ms-2 font-bold">
                      {val.courier_service_name}
                    </h1>
                    <h1 className="ms-2 font-normal">
                      {val.courier_service_code}
                    </h1>
                  </div>
                </div>
                <Button
                  size={"icon"}
                  className="bg-red-600 justify-self-start"
                  onClick={async () => {
                    await deleteKurir.mutateAsync(val.id);
                    refetchKurir();
                  }}
                >
                  <BsTrash></BsTrash>
                </Button>
              </div>
            ))}
          <div className="border-2 w-1/12 flex justify-center items-center m-2 p-4 rounded-lg h-24">
            <DialogKurir
              set={setKurir}
              form={form}
              onSubmit={onSubmit}
              open={open}
              setOpen={setOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
}
