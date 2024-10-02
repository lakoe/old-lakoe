import { ChangeEvent, FC, useRef, useState } from "react";
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

const UpdateStockDialog: FC<IUpdatePriceProps> = ({ productVariant }) => {
  const [newStock, setNewStock] = useState<number>();

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const res = await Axios({
      method: "patch",
      url: `${api}/product/stock/${productVariant.variant_option_values.id}`,
      data: newStock,
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
          Ubah Stok
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Ubah Stok</DialogTitle>
          <DialogDescription className="text-sm">
            Ubah stok untuk varian{" "}
            <span className="font-bold">{productVariant.name}</span>
          </DialogDescription>
          <Input
            type="text"
            className="border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cari Produk"
            value={newStock}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewStock(parseInt(e.target.value))
            }
          />
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end space-x-2 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-full">
                Batalkan
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="submit"
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

export default UpdateStockDialog;
