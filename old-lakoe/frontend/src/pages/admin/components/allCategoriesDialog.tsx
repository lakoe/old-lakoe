import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import useStore from "@/z-context";
import { useEffect } from "react";
import Axios from "axios";
import { Label } from "@/components/label";
import { FaTrash } from "react-icons/fa";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const AllCategoriesDialog = () => {
  const user = useStore((state) => state.user);
  const setCategories = useStore((state) => state.SET_CATEGORIES);
  const categories = useStore((state) => state.categories);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      const res = await Axios({
        method: "get",
        url: `${api}/categories`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  // delete categories
  const handleDeleteCategories = async (cId: string) => {
    const token = localStorage.getItem("token");
    await Axios({
      method: "delete",
      url: `${api}/categories/${cId}`,
      params: {
        userId: user.id,
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
          Lihat Semua Kategori
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Daftar Kategori</DialogTitle>
          <DialogDescription>
            {categories.length !== 0 ? (
              <div className="w-full max-h-96 flex flex-col gap-2 mt-4 overflow-y-auto">
                {categories.map((item) => (
                  <div className="flex justify-between items-center p-2 text-black border rounded shadow-lg">
                    <Label key={item.id}>{item.name}</Label>
                    <Button
                      onClick={() => handleDeleteCategories(item.id)}
                      className="bg-transparent hover:bg-slate-200"
                    >
                      <FaTrash size={"1.2rem"} color="red" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Label>Belum ada kategori</Label>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AllCategoriesDialog;
