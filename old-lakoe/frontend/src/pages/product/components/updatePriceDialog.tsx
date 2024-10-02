import { ChangeEvent, FC, useState } from "react";
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
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Axios from "axios";
import { api } from "@/lib/api";

interface IUpdatePriceProps {
  productVariant: IVariantOptions;
}

const UpdatePriceDialog: FC<IUpdatePriceProps> = ({ productVariant }) => {
  const [newPrice, setNewPrice] = useState<number>(
    productVariant.variant_option_values.price
  );

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const res = await Axios({
      method: "patch",
      url: `${api}/product/${productVariant.variant_option_values.id}`,
      data: { newPrice: newPrice },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          Ubah Harga
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Ubah Harga</DialogTitle>
          <DialogDescription className="text-sm">
            Ubah harga untuk varian{" "}
            <span className="font-bold">{productVariant.name}</span>
          </DialogDescription>

          <div className="relative flex items-center w-full">
            <span className="absolute left-3">Rp</span>
            <Input
              type="number"
              className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukan harga"
              value={newPrice}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPrice(parseInt(e.target.value))
              }
            />
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end space-x-2 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-full">
                Batalkan
              </Button>
            </DialogClose>

            <DialogClose>
              <Button
                onClick={handleUpdate}
                className="px-4 py-2 text-white bg-blue-500 rounded-full"
              >
                Simpan
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePriceDialog;
