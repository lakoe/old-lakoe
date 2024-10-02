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
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import useStore from "@/z-context";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import Axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AllCategoriesDialog from "./allCategoriesDialog";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const addCategoriesSchema = z.object({
  name: z.string().min(1, { message: "Masukan nama kategori" }),
});

const AddCategoriesDialog = () => {
  const user = useStore((state) => state.user);
  const setCategories = useStore((state) => state.SET_CATEGORIES);

  const formAddCategories = useForm<IAddCategories>({
    mode: "onSubmit",
    resolver: zodResolver(addCategoriesSchema),
  });

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

  const { refetch: refetchCategories } = useQuery({
    queryKey: ["categoriesStatus"],
    queryFn: fetchCategories,
  });

  const addCategoriesMutation = useMutation({
    mutationFn: async (newData: any) => {
      const token = localStorage.getItem("token");
      const userId = user.id;
      return await Axios({
        method: "post",
        url: `${api}/categories/${userId}`,
        data: newData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const handleAddCategories = async (data: any) => {
    // const token = localStorage.getItem("token");
    // const userId = user.id;

    const newData = {
      ...data,
    };

    // await Axios({
    //   method: "post",
    //   url: `${api}/categories/${userId}`,
    //   data: newData,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    await addCategoriesMutation.mutateAsync(newData);
    await refetchCategories();

    formAddCategories.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <BsPlus size={"1.3rem"} />
          Tambah Kategori
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={formAddCategories.handleSubmit(handleAddCategories)}>
          <DialogHeader>
            <DialogTitle>Tambahkan Kategori Baru</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col text-black gap-4 mt-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="name">
                    Nama Kategori
                    <span className="text-red-600"> *</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Masukan nama kategori"
                    {...formAddCategories.register("name")}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="w-full flex items-center mt-8">
              <div className="flex flex-1">
                <AllCategoriesDialog />
              </div>

              <div className="w-full flex justify-end gap-2">
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
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-full"
                  >
                    Simpan
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoriesDialog;
