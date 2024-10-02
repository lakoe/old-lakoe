import { InformasiContext } from "@/context/InformasiContext";
import { Informasi } from "@/datas/type";
import { HeaderLogoToko } from "@/features/headerPengaturan";
import React, { useContext, useState } from "react";
import { Button, buttonVariants } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { v4 as uuidv4 } from 'uuid';

export const AddInformasi: React.FC = () => {
  const context = useContext(InformasiContext);
  const [namaToko, setNamaToko] = useState("");
  const [selogan, setSelogan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  if (!context) {
    return null;
  }

  const uuid = uuidv4()
  const { informs, setInforms } = context;

  const handleAdd = () => {
    const newInformasi: Informasi = {
      id: uuid,
      namaToko,
      selogan,
      deskripsi,
    };
    setInforms([...informs, newInformasi]);
    setNamaToko("");
    setSelogan("");
    setDeskripsi("");
  };
  console.log(informs);

  return (
    <div className="w-full">
      <div className="flex gap-9">
        <div className="mt-3">
          <Label className="py-10">Selogan</Label>
          <Input
            placeholder="Buat Selogan Untuk Toko"
            className="mt-3 mb-3"
            value={selogan}
            onChange={(e) => setSelogan(e.target.value)}
          ></Input>
          <Label>Nama Toko</Label>
          <Input
            className="mt-3 mb-3"
            value={namaToko}
            onChange={(e) => setNamaToko(e.target.value)}
          ></Input>
        </div>
        <div className="flex-col mr-10 mt-3 ">
          <Label className="py-10">Deskripsi</Label>
          <Textarea
            className="mt-3 mb-5"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end mr-10 border-b pb-5">
        <Button
          className={buttonVariants({ variant: "customRGBA" })}
          onClick={handleAdd}
          type="submit"
        >
          Simpan
        </Button>
      </div>
      <HeaderLogoToko />
      <div className="border-b">
        {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input
                        id="picture"
                        type="file"
                        value={image}
                    // onChange={"handleFileChange"}
                    />
                </div> */}
      </div>
    </div>
  );
};
