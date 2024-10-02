import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Label } from "@/components/label";
import { FC } from "react";
import EditBankDialog from "./editBankDialog";

const AllBankDialog: FC<{ banks: IBankAccount[] }> = ({ banks }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Label className="cursor-pointer text-orange-500">Lihat Semua</Label>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Akun Bank Terdaftar</DialogTitle>
          <DialogDescription>
            <div className="w-full flex flex-col gap-2 mt-4">
              {banks.length !== 0 ? (
                banks.map((bank) => (
                  <div className="relative w-full p-4 border rounded">
                    <div className="flex flex-col gap-4 text-black ">
                      <Label className="text-xl">{bank.bank}</Label>
                      <Label className="">{bank.acc_number}</Label>
                      <Label className="text-end">a/n {bank.acc_name}</Label>
                    </div>

                    <div className="absolute top-2 right-2">
                      <EditBankDialog bank={bank} />
                    </div>
                  </div>
                ))
              ) : (
                <Label>Belum ada akun bank terdaftar</Label>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AllBankDialog;
