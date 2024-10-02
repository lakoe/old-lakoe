import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useProdukForm } from "./hooks/form-produk";

export function DetailProduk() {
  const { register, unregister } = useProdukForm();
  return (
    <div id="informasi-produk" className=" bg-slate-50 p-4">
      <h1 className="font-bold text-xl mb-4">Informasi Produk</h1>
      <h1 className=" text-md mb-2 mt-4">Nama Produk</h1>
      <Input placeholder="Masukan nama produk" {...register("produk_nama")} />

      <h1 className=" text-md mb-2 mt-4">URL Halaman Checkout</h1>
      <div className="flex justify-center items-center">
        <p className="bg-slate-100 p-3 rounded-s-lg border-2 text-xs">
          lakoe.store/
        </p>
        <Input
          placeholder="nama-produk"
          className="rounded-s-none rounded-e-xl"
          {...register("produk_url_checkout")}
        />
      </div>
      <div className="flex gap-2">
        <p className="font-normal mt-4">Kategori</p>
        {/* <p className="font-normal mt-4">{kategori[0] && kategori[0]} {kategori[1] && kategori[1]} {kategori[2] && kategori[2]}</p> */}
      </div>

      <Select
        onValueChange={(e) => {
          unregister("produk_kategori");
          register("produk_kategori", { value: e });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
