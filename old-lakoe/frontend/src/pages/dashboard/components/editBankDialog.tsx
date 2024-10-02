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
import { api } from "@/lib/api";
import useStore from "@/z-context";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DeleteBankDialog from "./deleteBankDialog";

const editBankSchema = z.object({
  bank: z.string(),
  acc_number: z.string().min(6, { message: "Masukan nomor rekening" }),
  acc_name: z.string().min(1, { message: "Masukan nama anda" }),
});

const EditBankDialog: FC<{ bank: IBankAccount }> = ({ bank }) => {
  const user = useStore((state) => state.user);

  const formEditBank = useForm<IAddBank>({
    mode: "onSubmit",
    resolver: zodResolver(editBankSchema),
  });

  const handleEditBank = async (data: any) => {
    const token = localStorage.getItem("token");
    const userId = user.id;
    const storeId = user.store_id;
    formEditBank.setValue("store_id", storeId);

    const newData = {
      ...data,
    };

    await Axios({
      method: "patch",
      url: `${api}/bank-account/${userId}/${bank.id}`,
      data: newData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleDeleteBank = async () => {
    const token = localStorage.getItem("token");
    const userId = user.id;

    await Axios({
      method: "delete",
      url: `${api}/bank-account/${userId}/${bank.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Label className="cursor-pointer">Edit Bank</Label>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={formEditBank.handleSubmit(handleEditBank)}>
          <DialogHeader>
            <DialogTitle>Edit Akun Bank</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col text-black gap-4 mt-4">
                {/* bank */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bank">
                    Bank
                    <span className="text-red-600"> *</span>
                  </Label>
                  <Input
                    type="text"
                    id="bank"
                    defaultValue={bank.bank}
                    {...formEditBank.register("bank")}
                    placeholder="Masukan Bank"
                  />
                </div>

                {/* Rekening */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="rekening">
                    Rekening
                    <span className="text-red-600"> *</span>
                  </Label>
                  <Input
                    type="text"
                    id="rekening"
                    defaultValue={bank.acc_number}
                    {...formEditBank.register("acc_number")}
                    placeholder="Masukan Rekening"
                  />
                </div>

                {/* Nama */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">
                    Nama
                    <span className="text-red-600"> *</span>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    defaultValue={bank.acc_name}
                    {...formEditBank.register("acc_name")}
                    placeholder="Masukan Nama"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="w-full flex items-center mt-4">
              <div className="flex flex-1">
                <DialogClose>
                  <Button
                    type="button"
                    onClick={handleDeleteBank}
                    className="bg-red-600 hover:bg-red-700 rounded-full"
                  >
                    Hapus Bank
                  </Button>
                </DialogClose>
              </div>

              <div className="w-full flex justify-end gap-2">
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
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full"
                  >
                    Simpan
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBankDialog;
