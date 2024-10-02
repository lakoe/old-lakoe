/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ChangeEvent, useEffect, useState } from "react";
import { BsImage, BsPlusCircle, BsTrash } from "react-icons/bs";
import { Button } from "../components/button";
import { Input } from "../components/input";

import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Textarea } from "@/components/textarea";
import { Toggle } from "@/components/toggle";
import { LoadingSpinner } from "@/routes/__root";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { Form } from "../components/form";
import { useProdukForm } from "./hooks/form-produk";
import { PreviewHalaman } from "./preview-halaman";
import { api } from "@/lib/api";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export const menuItemsData = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Services",
    url: "/services",
  },
  {
    title: "About",
    url: "/about",
  },
];

export function FormProdukBaru() {
  const {
    handleSubmit,
    register,
    errors,
    control,
    unregister,
    onSubmitForm,
    setValue,
    getValues,
    isSubmitted,
    isSubmitting,
  } = useProdukForm();

  type all = {
    harga: number;
    berat: number;
    sku: string;
    stok: number;
  };

  type categoryType = {
    id: string;
    name: string;
  };

  const formAll = useForm<all>();

  const [isVariant, setVariant] = useState<Boolean>(false);
  const [preview, setPreview] = useState<string[]>([]);
  const [previewOptions, setPreviewOptions] = useState<string[]>([]);
  const [variant, setVariantValue] = useState<string[]>([]);
  const [variantOptions, setVariantOptions] = useState<string[][]>([]);
  const [currentVariant, setCurrentVariant] = useState<string>("0");
  const [isVariantOption, setIsVariantOption] = useState<boolean[]>([]);
  const [isVariantGambar, setIsVariantGambar] = useState<boolean[]>([]);
  const [kategori, setKategori] = useState<string>("");
  const [hargaValue, sethargaValue] = useState<number[]>([]);
  const [stokValue, setstokValue] = useState<number[]>([]);
  const [skuValue, setskuValue] = useState<string[]>([]);
  const [weightValue, setweightValue] = useState<number[]>([]);
  const [panjangValue, setPanjangValue] = useState<number[]>([]);
  const [lebarValue, setLebarValue] = useState<number[]>([]);
  const [tinggiValue, setTinggiValue] = useState<number[]>([]);
  const [kategoriArray, setKategoriArray] = useState<string[]>([]);
  const [imageVarian, setImageVarian] = useState<(File | null)[]>([]);
  const [varianArray, setvarianArray] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<categoryType[]>([]);

  useEffect(() => {
    async function auth() {
      try {
        const response = await Axios({
          method: "get",
          url: `${api}/categories`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        console.log("data", data);
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    }

    auth();
  }, []);

  const setAllVarian = (index: number, isToggle: boolean) => {
    const array = [...varianArray];
    if (isToggle) {
      array.push(index);
    } else {
      array.splice(index, 1);
    }

    setvarianArray(array);
  };

  const handlehargaChange = (index: number, event: any) => {
    const price = { ...hargaValue };
    price[index] = event.target.value;
    sethargaValue(price);
    setValue("produk_ukuran_option_price", price);
    // register("produk_ukuran_option_price",{value: price, valueAsNumber : true})
  };

  const handleWeightChange = (index: number, event: any) => {
    const price = { ...weightValue };
    price[index] = event.target.value;
    setweightValue(price);
    // register("produk_ukuran_option_weight", { value: price });
    setValue("produk_ukuran_option_weight", price);
  };

  const handleStokChange = (index: number, event: any) => {
    const price = { ...stokValue };
    price[index] = event.target.value;
    setstokValue(price);
    // register("produk_ukuran_option_stock", { value: price });
    setValue("produk_ukuran_option_stock", price);
  };

  const handlePanjang = (index: number, event: any) => {
    const price = { ...panjangValue };
    price[index] = event.target.value;
    setPanjangValue(price);
    // register("produk_ukuran_option_panjang", { value: price });
    setValue("produk_ukuran_option_panjang", price);
    console.log("panjang", price);
  };

  const handleLebar = (index: number, event: any) => {
    const price = { ...lebarValue };
    price[index] = event.target.value;
    setLebarValue(price);
    // register("produk_ukuran_option_lebar", { value: price });
    setValue("produk_ukuran_option_lebar", price);
  };

  const handleTinggi = (index: number, event: any) => {
    const price = { ...tinggiValue };
    price[index] = event.target.value;
    setTinggiValue(price);
    // register("produk_ukuran_option_tinggi", { value: price });
    setValue("produk_ukuran_option_tinggi", price);
  };

  const handleSKUChange = (index: number, event: any) => {
    const price = { ...skuValue };
    price[index] = event.target.value;
    setskuValue(price);
    // register("produk_ukuran_option_sku", { value: price });
    setValue("produk_ukuran_option_sku", price);
  };

  const formUse = useForm({
    defaultValues: {
      options: "",
    },
  });

  function onSubmit(data: any) {
    console.log("data", data);
    variantOptionHandle(0, data["options"]);
  }

  function imageHandle(index: number, url: string) {
    const newUrl = [...preview];
    newUrl[index] = url;
    setPreview(newUrl);
    console.log(newUrl);
  }

  function imageOptionHandle(index: number, url: string, img: File | null) {
    const newImg = [...imageVarian];
    newImg[index] = img;
    setImageVarian(newImg);
    const newUrl = [...previewOptions];
    newUrl[index] = url;
    setPreviewOptions(newUrl);
    setValue("produk_ukuran_option_img", newImg);
    console.log(newUrl);
  }

  function variantOptionHandle(x: number, option: string) {
    if (!variantOptions[x]) variantOptions[x] = [];
    const vary: string[][] = [...variantOptions];
    vary[x].push(option);
    setVariantOptions(vary);
    console.log("Variant OPTIONNNS", variantOptions);
    {
      register("produk_ukuran_option", { value: vary[x] });
    }
  }

  function deleteVariantOptionHandle(x: number, y: number) {
    const vary = [...variantOptions];
    vary[x].splice(y, 1);
    setVariantOptions(vary);
    setValue("produk_ukuran_option", vary[x]);
    console.log(variantOptions);
  }

  function variantHandle(index: number, vary: string) {
    const variants = [...variant];
    variants[index] = vary;
    setVariantValue(variants);
    console.log(variants);
  }

  function handleVariantSwitch(index: number, bool: boolean) {
    if (!isVariantOption[index]) isVariantOption[index] = false;
    const variants = [...isVariantOption];
    variants[index] = bool;
    setIsVariantOption(variants);
    console.log(variants);
  }

  function handleVariantGambarSwitch(index: number, bool: boolean) {
    if (!isVariantGambar[index]) isVariantGambar[index] = false;
    const variants = [...isVariantGambar];
    variants[index] = bool;
    setIsVariantGambar(variants);
    console.log(variants);
  }

  function kategoriHandle(event: any) {
    // console.log("kategori", event)
    setKategori(event);
    setValue("produk_kategori", event);
  }

  function kategoriArrayHandle(index: number, event: any) {
    const variants = [...kategoriArray];
    variants[index] = event;
    setKategoriArray(variants);
    console.log(event);
  }

  useEffect(() => {
    console.log("variantopt", variantOptions);
  }, [variantOptions]);

  useEffect(() => {
    variantHandle(0, "Varian");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)} className="w-full">
        <div className="flex flex-col gap-4">
          {/* informasi produk */}
          <div
            id="informasi-produk"
            className=" bg-white p-4 rounded shadow-sm shadow-black"
          >
            <h1 className="font-bold text-xl mb-4">Informasi Produk</h1>
            <h1 className=" text-md mb-2 mt-4">
              Nama Produk <Label className="text-red-600">*</Label>
            </h1>
            <Input
              placeholder="Masukan nama produk"
              {...register("produk_nama", { required: true })}
              required
            />

            <h1 className=" text-md mb-2 mt-4">
              URL Halaman Checkout <Label className="text-red-600">*</Label>
            </h1>
            <div className="flex justify-center items-center">
              <p className="bg-slate-100 p-3 rounded-s-lg border-2 text-xs">
                lakoe.store/
              </p>
              <Input
                placeholder="nama-produk"
                className="rounded-s-none rounded-e-xl"
                {...register("produk_url_checkout", { required: true })}
                required
              />
            </div>
            <div className="flex gap-2">
              <p className="font-normal mt-4">
                Kategori <Label className="text-red-600">*</Label>
              </p>
              <p className="font-normal mt-4">{kategori && kategori}</p>
            </div>

            <Select
              // defaultValue={category && category[0].id}
              onValueChange={(e) => {
                unregister("produk_kategori");
                kategoriHandle(e);
                kategoriArrayHandle(0, e);
              }}
              required
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Kategori</SelectLabel>
                  {category &&
                    category.map((value: any) => {
                      return (
                        <SelectItem value={value.id}>{value.name}</SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* <DetailProduk/> */}
          <div
            id="detail-produk"
            className="bg-white p-4 rounded shadow-sm shadow-black"
          >
            <h1 className="font-bold text-xl mb-4">Detail Produk</h1>
            <p className="mb-2">Deskripsi</p>
            <Textarea {...register("produk_deskripsi")} className="h-32" />
            <p className="mt-4 mb-2">
              Foto Produks <Label className="text-red-600">*</Label>
            </p>
            <div id="produk-foto" className="flex gap-2">
              <label
                htmlFor="produk_foto"
                className="relative text-gray-400 focus-within:text-gray-600 block"
              >
                <BsImage className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-12" />
                <Input
                  type="file"
                  {...register("produk_foto", { required: true })}
                  className="w-32 h-32 text-transparent"
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    imageHandle(0, displayUrl);
                  }}
                  required
                ></Input>
                {preview[0] && (
                  <div>
                    <img
                      src={preview[0]}
                      className="absolute inset-0 w-32 h-32 object-cover"
                    />
                    <BsTrash
                      className="absolute z-1 inset-0 text-xl text-red-600 font-bold m-2"
                      onClick={() => {
                        {
                          unregister("produk_foto");
                        }
                        imageHandle(0, "");
                      }}
                    />
                  </div>
                )}
              </label>

              <label
                htmlFor="produk_foto_1"
                className="relative text-gray-400 focus-within:text-gray-600 block"
              >
                <BsImage className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-12" />
                <Input
                  type="file"
                  {...register("produk_foto_1")}
                  className="w-32 h-32 text-transparent"
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    imageHandle(1, displayUrl);
                  }}
                ></Input>
                {preview[1] && (
                  <div>
                    <img
                      src={preview[1]}
                      className="absolute inset-0 w-32 h-32 object-cover"
                    />
                    <BsTrash
                      className="absolute z-1 inset-0 text-xl text-red-600 font-bold m-2"
                      onClick={() => {
                        {
                          unregister("produk_foto_1");
                        }
                        imageHandle(1, "");
                      }}
                    />
                  </div>
                )}
              </label>

              <label
                htmlFor="produk_foto_2"
                className="relative text-gray-400 focus-within:text-gray-600 block"
              >
                <BsImage className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-12" />
                <Input
                  type="file"
                  {...register("produk_foto_2")}
                  className="w-32 h-32 text-transparent"
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    imageHandle(2, displayUrl);
                  }}
                ></Input>
                {preview[2] && (
                  <div>
                    <img
                      src={preview[2]}
                      className="absolute inset-0 w-32 h-32 object-cover"
                    />
                    <BsTrash
                      className="absolute z-1 inset-0 text-xl text-red-600 font-bold m-2"
                      onClick={() => {
                        {
                          unregister("produk_foto_2");
                        }
                        imageHandle(3, "");
                      }}
                    />
                  </div>
                )}
              </label>

              <label
                htmlFor="produk_foto_3"
                className="relative text-gray-400 focus-within:text-gray-600 block"
              >
                <BsImage className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-12" />
                <Input
                  type="file"
                  {...register("produk_foto_3")}
                  className="w-32 h-32 text-transparent"
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    imageHandle(3, displayUrl);
                  }}
                ></Input>
                {preview[3] && (
                  <div>
                    <img
                      src={preview[3]}
                      className="absolute inset-0 w-32 h-32 object-cover"
                    />
                    <BsTrash
                      className="absolute z-1 inset-0 text-xl text-red-600 font-bold m-2"
                      onClick={() => {
                        {
                          unregister("produk_foto_3");
                        }
                        imageHandle(4, "");
                      }}
                    />
                  </div>
                )}
              </label>

              <label
                htmlFor="produk_foto_4"
                className="relative text-gray-400 focus-within:text-gray-600 block"
              >
                <BsImage className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-12" />
                <Input
                  type="file"
                  {...register("produk_foto_4")}
                  className="w-32 h-32 text-transparent"
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    imageHandle(4, displayUrl);
                  }}
                ></Input>
                {preview[4] && (
                  <div>
                    <img
                      src={preview[4]}
                      className="absolute inset-0 w-32 h-32 object-cover"
                    />
                    <BsTrash
                      className="absolute z-1 inset-0 text-xl text-red-600 font-bold m-2"
                      onClick={() => {
                        {
                          unregister("produk_foto_4");
                        }
                        imageHandle(5, "");
                      }}
                    />
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* variant */}
          <div
            id="varian-produk"
            className="bg-white p-4 rounded shadow-sm shadow-black"
          >
            {isVariant ? (
              <div className="w-full flex flex-col">
                <div className="flex justify-between">
                  <div>
                    <h1 className="font-bold text-xl mb-2">Varian Produk</h1>
                    <p className="text-gray-400 text-sm mb-2">
                      Tambah varian agar pembeli dapat memilih produk yang
                      sesuai, yuk!
                    </p>
                  </div>
                  <Button
                    variant={"outline"}
                    className="rounded-2xl self-end"
                    onClick={() => {
                      setVariant(false);
                      setVariantValue([]);
                      setVariantOptions([]);
                      unregister("produk_ukuran_option");
                    }}
                  >
                    <BsTrash className="me-2" />
                    Hapus Varian
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <h1 className="font-bold text-xl mb-2">Varian Produk</h1>
                  <p className="text-gray-400 text-sm mb-2">
                    Tambah varian agar pembeli dapat memilih produk yang sesuai,
                    yuk!
                  </p>
                </div>
                <Button
                  variant={"outline"}
                  className="rounded-2xl self-end"
                  onClick={() => {
                    setVariant(true);
                    setValue("produk_berat", 0);
                    setValue("produk_panjang", 0);
                    setValue("produk_harga", 0);
                    setValue("produk_lebar", 0);
                    setValue("produk_tinggi", 0);
                    setValue("produk_berat", 0);
                    setValue("produk_sku", "");
                    setValue("produk_stok", 0);
                  }}
                >
                  <BsPlusCircle className="me-2" />
                  Tambah Varian
                </Button>
              </div>
            )}

            {isVariant && (
              <div className="mt-2">
                {/* <h1 className="font-bold text-xl mb-2">Varian Produk</h1> */}
                <Dialog open={dialogOpen}>
                  <DialogTrigger
                    asChild
                    onClick={() => setDialogOpen(!dialogOpen)}
                  >
                    {/* <Button
                      variant="outline"
                      className="bg-blue-600 text-white"
                    >
                      Atur Sekaligus
                    </Button> */}
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <Button
                      type="button"
                      onClick={() => setDialogOpen(!dialogOpen)}
                      className="w-12 bg-red-600"
                    >
                      X
                    </Button>
                    <form
                      onSubmit={() => {
                        formAll.handleSubmit((data) => {
                          console.log("submit varian all");
                          for (let index in varianArray) {
                            const inNum = Number(index);

                            const harga_all = [...hargaValue];
                            harga_all.splice(inNum, 1, data.harga);
                            sethargaValue(harga_all);

                            const sku_all = [...skuValue];
                            sku_all.splice(inNum, 1, data.sku);
                            setskuValue(sku_all);

                            const berat_all = [...weightValue];
                            berat_all.splice(inNum, 1, data.berat);
                            setweightValue(berat_all);

                            const stok_all = [...stokValue];
                            stok_all.splice(inNum, 1, data.stok);
                            setstokValue(stok_all);
                          }
                        });
                      }}
                    >
                      <DialogHeader>
                        <DialogTitle>Atur Sekaligus</DialogTitle>
                        <DialogDescription>
                          Atur Seluruh Varian Disini
                        </DialogDescription>
                      </DialogHeader>
                      {variant.map((item, i) => (
                        <div className="grid gap-4">
                          <div className="flex gap-4">
                            {variantOptions[i] &&
                              variantOptions[i].map((item, x) => (
                                <div key={x}>
                                  <Toggle
                                    aria-label="Toggle italic"
                                    className="bg-blue-600 text-white"
                                    onPressedChange={(e) => {
                                      setAllVarian(x, e);
                                    }}
                                  >
                                    {item}
                                  </Toggle>
                                </div>
                              ))}
                          </div>
                          <div className="">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-2">
                                <div className="flex justify-center items-center mt-2 w-1/2">
                                  <p className="bg-slate-100 py-2 px-4 rounded-s-lg border-2 text-sm">
                                    Rp.
                                  </p>

                                  <Input
                                    placeholder="Harga"
                                    className="rounded-s-none rounded-e-xl"
                                    {...formAll.register("harga")}
                                    // value={hargaValue[x]}
                                    // onChange={(e) => handlehargaChange(x, e)}
                                    required
                                  />
                                </div>
                                <div className="flex justify-center items-center mt-2 w-1/2">
                                  <Input
                                    placeholder="Stok Produk"
                                    className="rounded-xl"
                                    {...formAll.register("stok")}
                                    // value={stokValue[x]}
                                    // onChange={(e) => handleStokChange(x, e)}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex justify-center items-center mt-2 w-1/2">
                                  <Input
                                    placeholder="Stok Keeping Unit"
                                    className="rounded-xl"
                                    {...formAll.register("sku")}
                                    // value={skuValue[x]}
                                    // onChange={(e) => handleSKUChange(x, e)}
                                    required
                                  />
                                </div>
                                <div className="flex justify-center items-center mt-2 w-1/2">
                                  <Input
                                    placeholder="Berat Produk"
                                    className="rounded-e-none rounded-s-xl"
                                    {...formAll.register("berat")}
                                    // value={weightValue[x]}
                                    // onChange={(e) => handleWeightChange(x, e)}
                                    required
                                  />
                                  <p className="bg-slate-100 py-2 px-4 rounded-e-lg border-2 text-sm">
                                    Kg
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button type="submit">Save changes</Button>
                    </form>
                  </DialogContent>
                </Dialog>

                {variant.map((item, i) => (
                  <div className="w-full flex flex-col" key={i}>
                    <p className="my-2">{item}</p>
                    <Form {...formUse}>
                      <form className="w-2/3 space-y-6 flex gap-4 items-center">
                        <div className="flex items-center gap-4">
                          <Input
                            placeholder="Varian"
                            {...formUse.register("options")}
                            required
                          />
                          <Button
                            className=""
                            onClick={formUse.handleSubmit(onSubmit)}
                          >
                            Tambahkan
                          </Button>
                        </div>
                      </form>
                    </Form>
                    <div className="flex gap-4 mt-4">
                      {variantOptions[i] &&
                        variantOptions[i].map((item, x) => (
                          <div key={x}>
                            <Button
                              onClick={() => {
                                deleteVariantOptionHandle(i, x);
                              }}
                              className="bg-red-500"
                            >
                              <BsTrash className="me-2" />
                              {item}
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-4 mt-4">
                  {variantOptions[parseInt(currentVariant)] &&
                    variantOptions[parseInt(currentVariant)].map((item, x) => (
                      <div>
                        <div className="flex gap-4 mb-2 mt-4 ">
                          <Switch
                            onClick={() =>
                              handleVariantGambarSwitch(x, !isVariantGambar[x])
                            }
                          />
                          <p>Gunakan Gambar Varian</p>
                        </div>
                        {isVariantGambar[x] && (
                          <div>
                            <label
                              htmlFor={"varian-option" + x}
                              className="relative text-gray-400 focus-within:text-gray-600 block"
                            >
                              <BsImage className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-12" />
                              <Input
                                type="file"
                                className="w-32 h-32 text-transparent"
                                onChange={(event) => {
                                  const { files, displayUrl } =
                                    getImageData(event);
                                  imageOptionHandle(x, displayUrl, files[0]);
                                }}
                                required
                              ></Input>
                              {previewOptions[x] && (
                                <div>
                                  <img
                                    src={previewOptions[x]}
                                    className="absolute inset-0 w-32 h-32 object-cover"
                                  />
                                  <BsTrash
                                    className="absolute z-1 inset-0 text-xl text-red-600 font-bold m-2"
                                    onClick={() => {
                                      imageOptionHandle(x, "", null);
                                    }}
                                  />
                                </div>
                              )}
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {variantOptions[0] &&
                  variantOptions[0].map((item, x) => (
                    <>
                      <div className="flex items-center mb-2 mt-4 gap-2">
                        <p>{item}</p>
                        <Switch
                          onClick={() =>
                            handleVariantSwitch(x, !isVariantOption[x])
                          }
                        />
                        <p>Aktif</p>
                      </div>

                      {isVariantOption[x] && (
                        <div className="mb-12">
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                              <div className="flex justify-center items-center mt-2 w-1/2">
                                <p className="bg-slate-100 py-2 px-4 rounded-s-lg border-2 text-sm">
                                  Rp.
                                </p>
                                <Input
                                  placeholder="Harga"
                                  className="rounded-s-none rounded-e-xl"
                                  name="harga"
                                  value={hargaValue[x]}
                                  onChange={(e) => handlehargaChange(x, e)}
                                  required
                                />
                              </div>
                              <div className="flex justify-center items-center mt-2 w-1/2">
                                <Input
                                  placeholder="Stok Produk"
                                  className="rounded-xl"
                                  value={stokValue[x]}
                                  onChange={(e) => handleStokChange(x, e)}
                                  required
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex justify-center items-center mt-2 w-1/2">
                                <Input
                                  placeholder="Stok Keeping Unit"
                                  className="rounded-xl"
                                  value={skuValue[x]}
                                  onChange={(e) => handleSKUChange(x, e)}
                                  required
                                />
                              </div>
                              <div className="flex justify-center items-center mt-2 w-1/2">
                                <Input
                                  placeholder="Berat Produk"
                                  className="rounded-e-none rounded-s-xl"
                                  value={weightValue[x]}
                                  onChange={(e) => handleWeightChange(x, e)}
                                  required
                                />
                                <p className="bg-slate-100 py-2 px-4 rounded-e-lg border-2 text-sm">
                                  Kg
                                </p>
                              </div>
                            </div>
                          </div>

                          <p className="mt-4">
                            Ukuran Produk{" "}
                            <Label className="text-red-600">*</Label>
                          </p>
                          <div className="flex gap-4">
                            <div className="flex justify-center items-center mt-2">
                              <Input
                                placeholder="Panjang"
                                className="rounded-e-none rounded-s-xl"
                                value={panjangValue[x]}
                                onChange={(e) => handlePanjang(x, e)}
                                required
                              />
                              <p className="bg-slate-100 py-2 px-4 rounded-e-lg border-2 text-sm">
                                cm
                              </p>
                            </div>

                            <div className="flex justify-center items-center mt-2">
                              <Input
                                placeholder="lebar"
                                className="rounded-e-none rounded-s-xl"
                                value={lebarValue[x]}
                                onChange={(e) => handleLebar(x, e)}
                                required
                              />
                              <p className="bg-slate-100 py-2 px-4 rounded-e-lg border-2 text-sm">
                                cm
                              </p>
                            </div>

                            <div className="flex justify-center items-center mt-2">
                              <Input
                                placeholder="tinggi"
                                className="rounded-e-none rounded-s-xl"
                                value={tinggiValue[x]}
                                onChange={(e) => handleTinggi(x, e)}
                                required
                              />
                              <p className="bg-slate-100 py-2 px-4 rounded-e-lg border-2 text-sm">
                                cm
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
              </div>
            )}
          </div>

          {/* minimal pembelian */}
          <div className="bg-white p-4 rounded shadow-sm shadow-black">
            <p className="mt-4">
              Minimal Pembelian <Label className="text-red-600">*</Label>
            </p>
            <div className="flex justify-center items-center mt-2">
              <Input
                placeholder="Produk"
                className="rounded-e-none rounded-s-xl"
                {...register("produk_min_beli", {
                  valueAsNumber: true,
                  required: true,
                })}
                required
              />
              <p className="bg-slate-100 py-2 px-4 rounded-e-lg border-2 text-sm">
                Produk
              </p>
            </div>
            <p className="mt-4">
              Ukuran Produk <Label className="text-red-600">*</Label>
            </p>
            <div className="flex gap-4">
              <div className="flex justify-center items-center mt-2">
                <Input
                  placeholder="Panjang"
                  className="rounded-e-none rounded-s-xl"
                  {...register("produk_panjang", {
                    valueAsNumber: true,
                    required: true,
                  })}
                  required
                />
                <p className="bg-slate-100 py-2 px-4 rounded-e-lg border-2 text-sm">
                  cm
                </p>
              </div>
              <div className="flex justify-center items-center mt-2">
                <Input
                  placeholder="Lebar"
                  className="rounded-e-none rounded-s-xl"
                  {...register("produk_lebar", {
                    valueAsNumber: true,
                    required: true,
                  })}
                  required
                />
                <p className="bg-slate-100 py-2 px-4 rounded-e-lg border-2 text-sm">
                  cm
                </p>
              </div>
              <div className="flex justify-center items-center mt-2">
                <Input
                  placeholder="Tinggi"
                  className="rounded-e-none rounded-s-xl"
                  {...register("produk_tinggi", {
                    valueAsNumber: true,
                    required: true,
                  })}
                  required
                />
                <p className="bg-slate-100 py-2 px-4 rounded-e-lg border-2 text-sm">
                  cm
                </p>
              </div>
            </div>
          </div>

          {/* {!isVariant && (
            <div className="flex flex-col gap-4">
              <div
                id="harga"
                className="bg-white p-4 rounded shadow-sm shadow-black"
              >
                <h1 className="font-bold text-xl mb-4">Harga</h1>
                <p>
                  Harga <Label className="text-red-600">*</Label>
                </p>
                <div className="flex justify-center items-center mt-2">
                  <p className="bg-slate-100 py-2 px-4 rounded-s-lg border-2 text-sm">
                    Rp.
                  </p>
                  <Input
                    placeholder="Harga"
                    className="rounded-s-none rounded-e-xl"
                    {...register("produk_harga", {
                      valueAsNumber: true,
                      required: true,
                    })}
                    required
                  />
                </div>
              </div>

              <div
                id="pengelolaan-produk"
                className="bg-white p-4 rounded shadow-sm shadow-black"
              >
                <h1 className="font-bold text-xl mb-4">Pengelolaan Produk</h1>
                <div className="flex gap-4">
                  <div>
                    <p>
                      Stok Produk <Label className="text-red-600">*</Label>
                    </p>
                    <Input
                      {...register("produk_stok", {
                        valueAsNumber: true,
                        required: true,
                      })}
                      required
                    ></Input>
                  </div>
                  <div>
                    <p>
                      SKU(Stok Keeping Unit){" "}
                      <Label className="text-red-600">*</Label>
                    </p>
                    <Input
                      {...register("produk_sku", { required: true })}
                      required
                    ></Input>
                  </div>
                </div>
              </div>

              <div
                id="ukuran"
                className="bg-white p-4 rounded shadow-sm shadow-black"
              >
                <h1 className="font-bold text-xl mb-4"> </h1>

                <p>
                  Berat Produk <Label className="text-red-600">*</Label>
                </p>
                <div className="flex items-center">
                  <Input
                    placeholder="Berat Produk"
                    className="rounded-e-none rounded-s-xl"
                    {...register("produk_berat", {
                      valueAsNumber: true,
                      required: true,
                    })}
                    required
                  />
                  <p className="bg-slate-100 py-2 px-4 rounded-e-lg border-2 text-sm">
                    Kg
                  </p>
                </div>
              </div>
            </div>
          )} */}

          {/*  */}
          <div className="flex justify-between gap-4 bg-white p-4 w-full rounded shadow-sm shadow-black">
            <div className="w-full">
              {isSubmitted && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Preview Halaman Checkout</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[1080px] h-full">
                    <DialogHeader>
                      <DialogTitle>Preview Halaman Checkout</DialogTitle>
                      <DialogDescription>
                        See your product checkout pages here.
                      </DialogDescription>
                    </DialogHeader>
                    <PreviewHalaman />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="flex ">
              <Button variant={"outline"} className="rounded-3xl me-2">
                Batal
              </Button>
              {isSubmitting ? (
                <Button
                  variant={"outline"}
                  type="submit"
                  className="bg-blue-600 text-white rounded-3xl"
                  disabled
                >
                  Simpan
                  <LoadingSpinner></LoadingSpinner>
                </Button>
              ) : (
                <Button
                  variant={"outline"}
                  type="submit"
                  className="bg-blue-600 text-white rounded-3xl"
                >
                  Simpan
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
