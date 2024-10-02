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
import { api } from "@/lib/api";

const DoneDialog: FC<{ dataWithdraw: IDataWithdraw }> = ({ dataWithdraw }) => {
  const user = useStore((state) => state.user);

  const handleDone = async () => {
    const token = localStorage.getItem("token");
    const userId = user.id;
    await Axios({
      method: "patch",
      url: `${api}/withdraw/done/d/w/${dataWithdraw.id}`,
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
        <Button className="px-4 py-2 text-white bg-blue-500 rounded-full">
          Selesaikan Permintaan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selesaikan Permintaan</DialogTitle>
          <DialogDescription>
            <div className="mt-4 text-black">
              <Label>Yakin selesaikan permintaan ini?</Label>
              <div className="flex flex-col gap-2 mt-4 p-2 border rounded shadow-lg">
                <Label>Detail tujuan</Label>
                <div>
                  {dataWithdraw.bank} - {dataWithdraw.rekening} -{" "}
                  {dataWithdraw.name}
                </div>

                <Label>Nominal</Label>
                <div>Rp{dataWithdraw.nominal}</div>
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
                onClick={handleDone}
                className="px-4 py-2 text-white bg-blue-500 rounded-full"
              >
                Ya, Selesaikan
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DoneDialog;
