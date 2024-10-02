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
} from "@/components/dialog";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import useStore from "@/z-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { ChangeEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import dataBank from "../../../assets/json/dataBank.json";
import Axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";

const addBankSchema = z.object({
  bank: z.string(),
  acc_number: z.string().min(6, { message: "Masukan nomor rekening" }),
  acc_name: z.string().min(1, { message: "Masukan nama anda" }),
});

const AddBankAccountDialog: FC<{ banks: IBankAccount[]; }> = ({ banks }) => {
  const user = useStore((state) => state.user);

  const formAddBank = useForm<IAddBank>({
    mode: "onSubmit",
    resolver: zodResolver(addBankSchema),
  });

  const handleAddBank = async (data: any) => {
    const token = localStorage.getItem("token");
    const userId = user.id;
    const storeId = user.store_id;
    formAddBank.setValue("store_id", storeId);

    const newData = {
      ...data,
    };

    console.log(newData);

    await Axios({
      method: "post",
      url: `${api}/bank-account/${userId}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // search bank
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchBank = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredBanks = dataBank.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {banks.length < 3 ? (
          <Button className="w-full bg-slate-800 hover:bg-slate-600">
            <BsPlus size={"1.3rem"} />
            Tambah Bank
          </Button>
        ) : (
          <Button className="w-full bg-slate-800 hover:bg-slate-600" disabled>
            <BsPlus size={"1.3rem"} />
            Tambah Bank
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={formAddBank.handleSubmit(handleAddBank)}>
          <DialogHeader>
            <DialogTitle>Tambahkan Akun Bank</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col text-black gap-4">
                {/* bank */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bank">
                    Bank
                    <span className="text-red-600"> *</span>
                  </Label>
                  <Select
                    onValueChange={(e) => formAddBank.setValue("bank", e)}
                  >
                    <SelectTrigger id="bank" className="w-full">
                      <SelectValue placeholder="Pilih Bank" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        <SelectLabel>
                          <Input
                            type="text"
                            placeholder="Cari Bank"
                            value={searchTerm}
                            onChange={handleSearchBank}
                          />
                        </SelectLabel>
                        {filteredBanks.map((bank) => (
                          <SelectItem value={bank.name}>{bank.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rekening */}
                <div className="flex flex-col gap-4">
                  <Label htmlFor="username">
                    Rekening
                    <span className="text-red-600"> *</span>
                  </Label>
                  <Input
                    id="nomor_rekening"
                    placeholder="Masukan Rekening"
                    {...formAddBank.register("acc_number")}
                    className="col-span-3"
                  />
                </div>

                {/* Nama */}
                <div className="flex flex-col gap-4">
                  <Label htmlFor="name">
                    Nama
                    <span className="text-red-600"> *</span>
                  </Label>
                  <Input
                    id="nama_rekening"
                    placeholder="Masukan Nama"
                    {...formAddBank.register("acc_name")}
                    className="col-span-3"
                  />
                </div>

                <Label className="mt-2 text-red-600 italic">
                  * Setiap user maksimal 3 akun bank
                </Label>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="w-full flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                >
                  Batalkan
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-full"
                >
                  Tambah Bank
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBankAccountDialog;
