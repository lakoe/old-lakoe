import { FC } from "react";
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
import Axios from "axios";
import { FaTrash } from "react-icons/fa";
import useStore from "@/z-context";
import { api } from "@/lib/api";

interface IUpdatePriceProps {
  productVariant: IVariantOptions;
}

const DeleteVariantDialog: FC<IUpdatePriceProps> = ({ productVariant }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const res = await Axios({
      method: "delete",
      url: `${api}/product/variant/${productVariant.variant_option_values.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="rounded-full bg-transparent hover:bg-slate-200"
        >
          <FaTrash size={"1.2rem"} color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Hapus Produk?</DialogTitle>
          <DialogDescription>
            <p className="text-xl text-black">
              Varian <span className="font-bold">{productVariant.name}</span>{" "}
              akan dihapus
            </p>

            <p className="mt-6">
              Varian yang dihapus tidak akan bisa dibatalkan. Pastikan varian
              yang kamu pilih itu sudah benar.
            </p>
          </DialogDescription>
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
                className="px-4 py-2 text-white bg-blue-500 rounded-full"
                onClick={handleDelete}
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

export default DeleteVariantDialog;
