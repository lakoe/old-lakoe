import { ChangeEvent, FC, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";
import useStore from "@/z-context";
import Axios from "axios";
import { api } from "@/lib/api";

interface IActivateProductProps {
  product: IProduct;
}

const ActivateProductDialog: FC<IActivateProductProps> = ({ product }) => {
  const user = useStore((state) => state.user);
  const [activateOpen, setActivateOpen] = useState(false);
  const [nonactivateOpen, setNonactivateOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(product.is_active);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (checked) {
      setActivateOpen(true);
    } else {
      setNonactivateOpen(true);
    }
  };

  const handleActivate = async () => {
    const token = localStorage.getItem("token");
    const userId = user.id;

    const res = await Axios({
      method: "patch",
      url: `${api}/product/activate/a/${product.id}`,
      params: {
        userId: userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);

    setActivateOpen(true);
    setIsChecked(true);
  };

  const handleNonactivate = async () => {
    const token = localStorage.getItem("token");
    const userId = user.id;

    const res = await Axios({
      method: "patch",
      url: `${api}/product/nonactivate/n/a/${product.id}`,
      params: {
        userId: userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
    setNonactivateOpen(true);
    setIsChecked(false);
  };

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={handleCheck} />
        <span className="slider round"></span>
      </label>

      {/* activate product */}
      <Dialog open={activateOpen} onOpenChange={setActivateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Aktifkan Produk?
            </DialogTitle>
            <DialogDescription>
              <label className="text-black">
                Produk <span className="font-bold">{product.name}</span> akan
                diaktifkan
              </label>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-end space-x-2 mt-4">
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
                  className="px-4 py-2 text-white bg-blue-500 rounded-full"
                  onClick={handleActivate}
                >
                  Ya, Aktifkan
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* nonactivate product */}
      <Dialog open={nonactivateOpen} onOpenChange={setNonactivateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Nonaktifkan Produk?
            </DialogTitle>
            <DialogDescription>
              <label className="text-black">
                Produk <span className="font-bold">{product.name}</span> akan
                dinonaktifkan
              </label>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-end space-x-2 mt-4">
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
                  className="px-4 py-2 text-white bg-blue-500 rounded-full"
                  onClick={handleNonactivate}
                >
                  Ya, Nonaktifkan
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivateProductDialog;
