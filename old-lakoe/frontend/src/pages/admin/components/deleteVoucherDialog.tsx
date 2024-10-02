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

const DeleteVoucherDialog: FC<{ voucher: IDataVoucher }> = ({ voucher }) => {
  const user = useStore((state) => state.user);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const userId = user.id;
    await Axios({
      method: "delete",
      url: `${api}/categories/discount/${voucher.id}`,
      params: {
        userId: userId,
      },
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
          <DialogTitle>Hapus Voucher</DialogTitle>
          <DialogDescription>
            <div className="mt-4 text-black">
              <Label>Yakin hapus voucher ini?</Label>
              <div className="w-full flex flex-col p-4 mt-4 border rounded shadow-lg">
                <Label className="text-xl font-bold">%{voucher.amount}</Label>
                <Label className="w-full flex justify-end text-xl">
                  {voucher.code}
                </Label>
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
                onClick={handleDelete}
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

export default DeleteVoucherDialog;
