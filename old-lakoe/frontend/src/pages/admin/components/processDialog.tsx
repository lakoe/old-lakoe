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
import { useMutation } from "@tanstack/react-query";

const ProcessDialog: FC<{ dataWithdraw: IDataWithdraw; refetch: any }> = ({
  dataWithdraw,
  refetch,
}) => {
  const user = useStore((state) => state.user);

  const handleProcess = async () => {
    const token = localStorage.getItem("token");
    const userId = user.id;
    await Axios({
      method: "patch",
      url: `${api}/withdraw/process/${dataWithdraw.id}`,
      params: {
        userId: userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const processMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const userId = user.id;
      return await Axios({
        method: "patch",
        url: `${api}/withdraw/process/${dataWithdraw.id}`,
        params: {
          userId: userId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 text-white bg-blue-500 rounded-full">
          Proses Permintaan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Proses Permintaan</DialogTitle>
          <DialogDescription>
            <div className="mt-4 text-black">
              <Label>Yakin proses permintaan ini?</Label>
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
                onClick={async () => {
                  await processMutation.mutateAsync();
                  refetch();
                }}
                className="px-4 py-2 text-white bg-blue-500 rounded-full"
              >
                Ya, Proses
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessDialog;
