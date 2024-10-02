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
import useStore from "@/z-context";
import { FC } from "react";
import Axios from "axios";
import { Label } from "@/components/label";
import { FaTrash } from "react-icons/fa";
import { api } from "@/lib/api";

const DeleteBankDialog: FC<{ bank: IBankAccount }> = ({ bank }) => {
  const user = useStore((state) => state.user);

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
        <Button className="bg-transparent hover:bg-slate-200">
          <FaTrash size={"1.2rem"} color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Bank</DialogTitle>
          <DialogDescription>
            <div className="mt-4 text-black">
              <Label>Yakin hapus akun bank ini?</Label>
              <div className="w-full p-4 mt-4 border rounded shadow-lg">
                <div className="flex flex-col gap-4 text-black ">
                  <Label className="text-xl">{bank.bank}</Label>
                  <Label className="">{bank.acc_number}</Label>
                  <Label className="text-end">a/n {bank.acc_name}</Label>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full flex justify-end items-center gap-2 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-full">
                Batalkan
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                onClick={handleDeleteBank}
                className="px-4 py-2 text-white bg-blue-500 rounded-full"
              >
                Ya, Hapus
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBankDialog;
