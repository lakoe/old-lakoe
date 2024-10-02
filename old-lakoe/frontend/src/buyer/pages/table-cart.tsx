import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { formattedNumber } from "@/features/pesanan/components/status-order/card-pesanan";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import Axios from "axios";
import { useEffect, useState } from "react";
import { BsTrash, BsXCircle } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

interface cart {
  carts_items: CartItems[];
}

interface CartItems {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export function TableCart(props: any) {
  const [items, setItems] = useState([]);

  const cart = useMutation({
    mutationFn: async (cart_id) => {
      return await Axios({
        method: "delete",
        url: `${api}/cart-items/delete/${cart_id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
  });

  const { refetch: refetchCart } = useQuery({
    queryKey: ["pesananStatus"],
    queryFn: fetchCarts,
  });

  async function fetchCarts() {
    try {
      const response = await Axios({
        method: "get",
        url: `${api}/cart-items/allUserCart`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("cart", response.data);
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await Axios({
          method: "get",
          url: `${api}/cart-items/allUserCart`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("cart", response.data);
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchItems();
    console.log("items", items);
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="shadow">
          <Button className="bg-white hover:bg-slate-100">
            <div className=" text-xl text-slate-800">
              <FaShoppingCart className="text-2xl" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[500px] h-96 overflow-y-auto">
          <DropdownMenuLabel>List Cart Item</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {items &&
            items.map((data: any, index) => {
              return (
                <DropdownMenuCheckboxItem key={index}>
                  {!data.invoices ? (
                    <div className="w-full my-3 flex justify-between items-center">
                      <div className="w-full flex items-center gap-2">
                        <img
                          src={data?.carts_items[0]?.img}
                          alt="image"
                          className="w-3/12 rounded-sm me-2"
                        />

                        <div className="mb-1 w-full">
                          <p className="text-lg">{data.carts_items[0]?.name}</p>
                          <p className="text-xs font-semibold">
                            {data.carts_items[0]?.quantity} item
                          </p>
                          <p className="font-bold">
                            {formattedNumber(data.carts_items[0]?.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-center">
                        <>
                          <Button className="w-full bg-slate-800 text-white">
                            <Link
                              to="/buyer/checkout"
                              search={{ id: data.carts_items[0]?.id }}
                            >
                              Bayar Sekarang
                            </Link>
                          </Button>

                          <Button
                            variant={"outline"}
                            className="rounded-md self-end bg-red-500 w-full"
                            onClick={async () => {
                              await cart.mutateAsync(data.id);
                              refetchCart();
                              props.refetch();
                            }}
                          >
                            <BsTrash className="text-white w-4 h-4" />
                          </Button>
                        </>
                      </div>
                    </div>
                  ) : (
                    data.invoices &&
                    data.invoices.status === "BELUM_DIBAYAR" && (
                      <div className="w-full my-3 flex justify-between items-center">
                        <div className="w-full flex items-center gap-2">
                          <img
                            src={data?.carts_items[0]?.img}
                            alt="image"
                            className="w-3/12 rounded-sm me-2"
                          />

                          <div className="mb-1 w-full">
                            <p className="text-lg">
                              {data.carts_items[0]?.name}
                            </p>
                            <p className="text-xs font-semibold">
                              {data.carts_items[0]?.quantity} item
                            </p>
                            <p className="font-bold">
                              {formattedNumber(data.carts_items[0]?.price)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-center">
                          <>
                            <Button
                              variant={"outline"}
                              className="rounded-md self-end bg-red-500 w-full"
                              onClick={async () => {
                                await cart.mutateAsync(data.id);
                                refetchCart();
                                props.refetch();
                              }}
                            >
                              <BsXCircle className="text-white w-4 h-4" />{" "}
                              <p className="text-white">Batalkan</p>
                            </Button>
                          </>
                        </div>
                      </div>
                    )
                  )}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
