/* eslint-disable */
import { Button, buttonVariants } from "@/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { TemplateContext } from "@/context/TemplateContext";
import { TemplatePesan } from "@/datas/type";
import React, { useContext, useState } from "react";
import { Textarea } from "./textarea";

interface UpdateTemplateProps {
  template: TemplatePesan;
  onUpdate: (updateTemplate: TemplatePesan) => void;
}
export const UpdateTemplate: React.FC<UpdateTemplateProps> = ({
  template,
  onUpdate,
}) => {
  const context = useContext(TemplateContext);

  const [judulPesan, setJudulPesan] = useState(template.judulPesan);
  const [daftarIsiPesan, setDaftarIsiPesan] = useState(template.daftarIsiPesan);
  // const [namaPembeli, setnamaPembeli] = useState(template.namaPembeli)
  // const [namaProduk, setNamaProduk] = useState(template.namaProduk)
  // const [namaToko, setNamaToko] = useState(template.namaToko)

  if (!context) {
    return null;
  }

  const { templates, setTemplates } = context;

  console.log(templates);

  const handleUpdate = () => {
    const updateTemplates = templates.map((tmp) =>
      tmp.id === template.id ? { ...tmp, judulPesan, daftarIsiPesan } : tmp
    );

    setTemplates(updateTemplates as TemplatePesan[]);
  };
  return (
    <>
      <Dialog>
        <div className="mr-40 mt-3">
          <DialogTrigger>
            <Button
              className={buttonVariants({
                variant: "custom",
              })}
            >
              Edit Tamplate
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>Edit Tamplate Pesan.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex-col justify-between items-center">
              <Label htmlFor="judulPesan" className="">
                Judul Pesan<span className="text-red-600">*</span>
              </Label>
              <Input
                id="judulPesan"
                name="judulPesan"
                value={judulPesan}
                onChange={(e) => setJudulPesan(e.target.value)}
                className="flex w-full mt-4"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex">
                <Button
                  className={buttonVariants({
                    variant: "custom",
                  })}
                >
                  Nama Customer
                </Button>
              </div>
              <div className="flex">
                <Button
                  className={buttonVariants({
                    variant: "custom",
                  })}
                >
                  Nama Produk
                </Button>
              </div>
              <div className="flex">
                <Button
                  className={buttonVariants({
                    variant: "custom",
                  })}
                >
                  Nama Toko
                </Button>
              </div>
            </div>

            <div className="flex-col justify-between items-center">
              <Label htmlFor="daftarIsiPesan" className="">
                Detail isi pesan<span className="text-red-600">*</span>
              </Label>
              <Textarea
                id="daftarIsiPesan"
                name="daftarIsiPesan"
                value={daftarIsiPesan.join(", ")}
                onChange={(e) => setDaftarIsiPesan([e.target.value])}
                className="flex w-full mt-4"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className={buttonVariants({
                  variant: "custom",
                })}
                onClick={handleUpdate}
              >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
