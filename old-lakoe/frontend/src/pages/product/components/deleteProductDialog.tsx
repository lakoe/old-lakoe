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
  product: IProduct;
}

const DeleteProductDialog: FC<IUpdatePriceProps> = ({ product }) => {
  const user = useStore((state) => state.user);

  const handleDeleteProduct = async () => {
    const token = localStorage.getItem("token");
    const userId = user.id;

    const res = await Axios({
      method: "delete",
      url: `${api}/product/${product.id}`,
      params: {
        userId: userId,
      },
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
              Produk <span className="font-bold">{product.name}</span> akan
              dihapus
            </p>

            <p className="mt-6">
              Produk yang dihapus tidak akan bisa dibatalkan. Pastikan produk
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
                onClick={handleDeleteProduct}
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

export default DeleteProductDialog;
