/* eslint-disable */
import { Button, buttonVariants } from "@/components/button";
import {
  Dialog,
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
import { DialogClose } from "@radix-ui/react-dialog";
import React, { useContext, useState } from "react";
import { Textarea } from "./textarea";

interface DialogProps {
  onSave: (templates: TemplatePesan) => void;
}

export const AddTemplatePesan: React.FC<DialogProps> = () => {
  const context = useContext(TemplateContext);

  const [judulPesan, setJudulPesan] = useState("");
  const [daftarIsiPesan, setDaftarIsiPesan] = useState([""]);
  const [namaPembeli, setNamaPembeli] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [namaToko, setNamaToko] = useState("");

  if (!context) {
    return null;
  }

  const { templates, setTemplates } = context;

  const handleButtonClick = (text: string) => {
    setDaftarIsiPesan([daftarIsiPesan + text]);
  };

  const handleSave = () => {
    const newTemplate: TemplatePesan = {
      id: Date.now(),
      judulPesan,
      daftarIsiPesan,
      namaPembeli,
      namaProduk,
      namaToko,
      map: function (
        arg0: (temp: { id: number }) =>
          | { id: number }
          | {
            judulPesan: string;
            daftarIsiPesan: string[];
            namaPembeli: string;
            namaProduk: string;
            namaToko: string;
            id: number;
          }
      ): unknown {
        throw new Error("Function not implemented.");
      },
    };
    console.log(newTemplate);

    setTemplates([...templates, newTemplate]);
    setJudulPesan("");
    setDaftarIsiPesan([""]);
    setNamaPembeli("");
    setNamaProduk("");
    setNamaToko("");
  };

  return (
    <Dialog>
      <div className="bg-white">
        <div className="flex justify-between">
          <div className="mt-3 mb-5 w-full flex flex-col">
            <Label className="font-bold text-xl">Daftar Template Pesan</Label>
            <Label className="text-xl" hidden>
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
                Buat Tamplate
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Buat Template Baru</DialogTitle>
              <DialogDescription>Buat Tamplate Pesan.</DialogDescription>
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex">
                  <Button onClick={() => handleButtonClick("[Nama Customer]")}
                    className={buttonVariants({
                      variant: "customRGBA",
                      className: "rounded-xl",
                    })}
                  >
                    Nama Customer
                  </Button>
                </div>
                <div className="flex">
                  <Button onClick={() => handleButtonClick("[Nama Produk]")}
                    className={buttonVariants({
                      variant: "customRGBA",
                      className: "rounded-xl",
                    })}
                  >
                    Nama Produk
                  </Button>
                </div>
                <div className="flex">
                  <Button onClick={() => handleButtonClick("[Nama Toko]")}
                    className={buttonVariants({
                      variant: "customRGBA",
                      className: "rounded-xl",
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
      </div>
    </Dialog>
  );
};

// =====================================================================================
// const [formData, setFormData] = useState<TemplatePesan>({
//   id: 0,
//   judulPesan: "",
//   daftarIsiPesan: [""],
//   namaPembeli: "",
//   namaToko: "",
//   namaProduk: "",
// });

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = e.target;
//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }));
// };

// const handleSave = () => {
//   onSave({ ...formData, id: Date.now() });
//   setFormData({
//     id: 0,
//     judulPesan: "",
//     daftarIsiPesan: [""],
//     namaPembeli: "",
//     namaToko: "",
//     namaProduk: "",
//   });
// };

// return (
// < div className = "mt-5 mr-10" >
//   <Dialog>
//     <div className="w-screen inline-flex justify-between">
//       <div className="mt-3 mb-5 w-screen flex flex-col">
//         <Label className="font-bold text-xl">Daftar Template Pesan</Label>
//       </div>
//       <div className="mr-40 mt-3">
//         <DialogTrigger asChild>
//           <Button variant="outline">Buat Tamplate</Button>
//         </DialogTrigger>
//       </div>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Buat Template Baru</DialogTitle>
//           <DialogDescription>Buat Tamplate Pesan.</DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="flex-col justify-between items-center">
//             <Label htmlFor="judulPesan" className="">
//               Judul Pesan<span className="text-red-600">*</span>
//             </Label>
//             <Input
//               id="judulPesan"
//               name="judulPesan"
//               value={formData.judulPesan}
//               onChange={handleChange}
//               className="flex w-full mt-4"
//             />
//           </div>

//           <div className="flex justify-between items-center">
//             <div className="flex">
//               <Button variant="outline">Nama Customer</Button>
//             </div>
//             <div className="flex">
//               <Button variant="outline">Nama Produk</Button>
//             </div>
//             <div className="flex">
//               <Button variant="outline">Nama Toko</Button>
//             </div>
//           </div>

//           <div className="flex-col justify-between items-center">
//             <Label htmlFor="daftarIsiPesan" className="">
//               Detail isi pesan<span className="text-red-600">*</span>
//             </Label>
//             <Textarea
//               id="daftarIsiPesan"
//               name="daftarIsiPesan"
//               value={formData.daftarIsiPesan.join(", ")}
//               onChange={(e) =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   daftarIsiPesan: e.target.value.split(", "),
//                 }))
//               }
//               className="flex w-full mt-4"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button onClick={handleSave}>Save changes</Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </div>
//   </Dialog>
// </ >
// );
