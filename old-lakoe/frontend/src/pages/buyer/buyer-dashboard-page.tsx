import { Button } from "@/components/button";
import { Card, CardContent, CardFooter } from "@/components/card";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { formattedNumber } from "@/features/pesanan/components/status-order/card-pesanan";
import { api } from "@/lib/api";
import { Link } from "@tanstack/react-router";
import Axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Navbar } from "./navbar";
import { useQuery } from "@tanstack/react-query";

interface VariantOptionValue {
  sku: string;
  weight: number;
  stock: number;
  price: number;
}

interface VariantOption {
  name: string;
  variant_option_values: VariantOptionValue;
}

interface Variant {
  id: string;
  name: string;
  variant_option: VariantOption[];
}

interface Store {
  id: string;
  name: string;
}

interface ProductDashboard {
  id: string;
  attachments: string;
  name: string;
  variants: Variant[];
  store_id: string;
  store: Store;
  categories_id: string;
}

interface Store {
  name: string;
}

export function BuyerDashboardPage() {
  const [product, setProduct] = useState<ProductDashboard[]>([]);
  const [category, setCategory] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState<String>("");

  const [search, setSearch] = useState<string>("");
  const [searchCateg, setSearchCateg] = useState<string>("Kategori");
  const [searchToko, setSearchToko] = useState<string>("Toko");

  const [store, setStore] = useState<Store[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const { refetch: refetchProduct } = useQuery({
    queryKey: ["productData"],
    queryFn: getDataProduct,
  });

  async function getDataProduct() {
    try {
      const response = await Axios({
        method: "get",
        url: `${api}/buyers/products`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const filtered = response.data.filter((data: any) => data.is_active);
      setProduct(filtered);
      console.log("fetchproduk", filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    async function getDataProduct() {
      try {
        const response = await Axios({
          method: "get",
          url: `${api}/buyers/products`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const filtered = response.data.filter((data: any) => data.is_active);
        setProduct(filtered);
        console.log("fetchproduk", filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function getCategoryProduct() {
      try {
        const response = await Axios({
          method: "get",
          url: `${api}/categories`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("categ", response.data);
        setCategory(response.data);
        // console.log("fetchproduk",response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function getDataStore() {
      try {
        const store = await Axios({
          method: "get",
          url: `${api}/buyers/store`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStore(store.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getDataProduct();
    getDataStore();
    getCategoryProduct();
  }, []);

  const filterProduct = product.filter((product) => {
    const filterByName = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const filterByCategory =
      searchCateg === "Kategori" || product.categories_id === searchCateg;

    const filterByStore =
      searchToko === "Toko" || product.store_id === searchToko;

    return filterByName && filterByCategory && filterByStore;
  });

  return (
    <>
      <div className="bg-slate-800">
        <Navbar refetch={refetchProduct} />

        <div className="flex gap-3 bg-slate-800 mt-8">
          <Input
            type="text"
            value={searchTerm}
            placeholder="Cari Pesanan"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
        {/* <div className="w-full h-screen bg-white">
          <div className="w-full h-full flex justify-center">
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-8xl font-bold">
                LAKOE<span className="text-[#28DF99]">BUYER</span>
              </h1>
              <p className="text-2xl font-bold">
                SOLUSI BELANJA TANPA TAKUT UANG HABIS
              </p>
            </div>
            <div className="w-full flex justify-center items-center">
              <img
                src="https://png.pngtree.com/png-clipart/20230912/original/pngtree-shopping-trolley-empty-picture-image_13031469.png"
                alt="hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div> */}

        <div className="sticky top-14 flex gap-3 p-2 px-10 bg-orange-500 pb-6">
          <Input
            type="text"
            placeholder="Cari Pesanan"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />

          <Select onValueChange={(e) => setSearchCateg(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kategori">Semua Kategori</SelectItem>
              {category &&
                category.map((categ: any) => {
                  return (
                    <SelectItem key={categ.id} value={categ.id}>
                      {categ.name}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>

          <Select onValueChange={(e) => setSearchToko(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Toko" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Toko">Semua Toko</SelectItem>
              {store.map((data) => {
                return (
                  <SelectItem key={data.id} value={data.id}>
                    {data.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="h-screen">
          <div className="flex flex-wrap justify-center gap-6 p-3 py-8 rounded-lg">
            {filterProduct.map((data: any, index) => {
              return (
                <>
                  <Card
                    key={index}
                    className="w-1/6 shadow-md shadow-black p-0"
                  >
                    <CardContent className="p-0">
                      <div>
                        <img
                          src={data?.attachments[0]}
                          alt="gambar"
                          className="rounded-lg rounded-b-none w-full h-56 object-cover"
                        />
                      </div>
                    </CardContent>

                    <CardFooter className="flex items-start flex-col p-4 pt-2">
                      <h1 className="flex items-center font-light italic gap-1 self-end">
                        {/* <img
                        src={data?.store?.logo_attachment}
                        alt="logo"
                        className="w-6 h-6"
                      /> */}
                        <RiVerifiedBadgeFill className="text-green-950 text-lg" />
                        {data?.store.name} Store
                      </h1>

                      <h1 className="text-lg">{data?.name}</h1>

                      <p className="font-bold mb-2">
                        {formattedNumber(
                          data?.variants[0].variant_option[0]
                            .variant_option_values.price
                        )}
                      </p>

                      <Select
                        defaultValue={data.variants[0].id}
                        onValueChange={(e) => setSelectedVariant(e)}
                      >
                        <SelectTrigger className="w-full mb-4">
                          <SelectValue
                            placeholder="Pilih Varian"
                            defaultValue={data.variants[0].id}
                          />
                        </SelectTrigger>
                        <SelectContent side="top">
                          <SelectGroup>
                            {data.variants
                              ?.filter(
                                (value: any) =>
                                  value.variant_option[0].variant_option_values
                                    ?.stock >= data.minimum_order &&
                                  value.variant_option[0].variant_option_values
                                    ?.is_active
                              )
                              .map((value: any) => {
                                return (
                                  <SelectItem key={value.id} value={value.id}>
                                    {value.variant_option[0].name} - Stok :
                                    {
                                      value.variant_option[0]
                                        .variant_option_values?.stock
                                    }
                                  </SelectItem>
                                );
                              })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <Button className="w-full bg-orange-500 hover:bg-orange-300">
                        {" "}
                        <Link
                          to="/buyer/add-cart"
                          search={{
                            product_id: data.id,
                            varian_id: selectedVariant
                              ? selectedVariant
                              : data.variants[0].id,
                          }}
                        >
                          Beli Sekarang
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
