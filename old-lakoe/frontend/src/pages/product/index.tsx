import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChangeEvent, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { LuPackageX } from "react-icons/lu";
import Axios from "axios";
import DropdownSort from "./components/dropDownSort";
import useStore from "@/z-context";
import IconInput from "./components/iconInput";
import ProductItem from "./components/productItem";
import { api } from "@/lib/api";

const Product = () => {
  const user = useStore((state) => state.user);

  // categories & action
  const setCategories = useStore((state) => state.SET_CATEGORIES);
  const categories = useStore((state) => state.categories);
  const actions = [
    {
      id: "2",
      name: "Harga Tertinggi",
    },
    {
      id: "3",
      name: "Harga Terendah",
    },
    {
      id: "4",
      name: "Stok Paling Banyak",
    },
    {
      id: "5",
      name: "Stok Paling Sedikit",
    },
  ];

  // data product
  const setProducts = useStore((state) => state.SET_PRODUCTS);
  const products = useStore((state) => state.products);

  console.log(products);

  // state sort by search, category, action
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedAction, setSelectedAction] = useState("Semua");
  const [isActive, setIsActive] = useState<number>(1);

  // fetch product
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      const userId = user.id;

      const res = await Axios({
        method: "get",
        url: `${api}/product/all/${userId}`,
        params: {
          searchTerm,
          isActive,
          category: selectedCategory,
          action: selectedAction,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("DATA", res.data);
      setProducts(res.data);
    };

    fetchProducts();
  }, [searchTerm, isActive, selectedCategory, selectedAction]);

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
      console.log("data categ", res.data);
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen px-6 py-4 bg-white shadow-sm shadow-black rounded">
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-bold">Daftar Produk</p>
        <Link
          to="/seller/add-product"
          className="[&.active]:font-bold flex gap-2 items-center py-3"
        >
          <Button className="gap-2 rounded-full bg-[#0086B4]">
            <CiCirclePlus size={"1.5rem"} />
            Tambah Produk
          </Button>
        </Link>
      </div>

      {/* sort status */}
      <div className="flex space-x-4 mb-4 border-b">
        <button
          onClick={() => setIsActive(1)}
          className={`pb-2 ${isActive === 1 ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
        >
          Semua
        </button>
        <button
          onClick={() => setIsActive(2)}
          className={`pb-2 ${isActive === 2 ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
        >
          Aktif
        </button>
        <button
          onClick={() => setIsActive(3)}
          className={`pb-2 ${isActive === 3 ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
        >
          Nonaktif
        </button>
      </div>

      {/* sort comp */}
      <div className="flex gap-2 mb-4">
        {/* search sort */}
        <IconInput
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />

        {/* category sort */}
        {/* <DropdownSort
          options={categories && categories}
          selectedOption={selectedCategory}
          onSelect={(category: string) => setSelectedCategory(category)}
        /> */}

        {/* action sort */}
        <DropdownSort
          options={actions && actions}
          selectedOption={selectedAction}
          onSelect={(action: string) => setSelectedAction(action)}
        />
      </div>

      {/* header and action */}
      <div className="flex items-center mb-2">
        <p className="flex flex-1 text-xl font-bold">
          {products?.length} Produk
        </p>
      </div>

      {/* result */}
      {products?.length === 0 ? (
        // if result 0
        <div className="w-full flex justify-center items-center gap-4 border p-4 rounded shadow-md">
          <LuPackageX size={"4rem"} color="#909090" />
          <div>
            <p className="text-xl font-bold">
              {isActive === 2
                ? "Oops, saat ini belum ada produk yang aktif"
                : isActive === 1
                  ? "Oops, saat ini belum ada produk"
                  : "Semua produk telah aktif"}
            </p>
            <p className="text-[#909090]">
              {isActive === 2
                ? "Aktifkan produk kamu atau buat produk baru"
                : "Kamu bisa buat produk baru dan menyimpannya"}
            </p>
          </div>
        </div>
      ) : (
        // if result !0
        <div className="flex flex-col gap-2">
          {products &&
            products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Product;
