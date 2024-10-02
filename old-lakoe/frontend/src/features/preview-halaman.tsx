import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel";
import { api } from "@/lib/api";
import useStore from "@/z-context";
import { Link } from "@tanstack/react-router";
import Axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";

interface Data {
  id: number;
  name: string;
  price: number;
  attachments: string[];
}

interface Store {
  name: string;
  logo_attachment: string;
}

interface cartItemsForm {
  attachments: string[];
  name: string;
  price: number;
  quantity: Number;
  description: string;
  stock: Number;
  store: Store;
}

type paramsCart = {
  product_id: string;
  varian_id: string;
};

export function PreviewHalaman(props: any) {
  const product = useStore((state) => state.produk);

  const [dataOrder, setDataOrder] = useState<cartItemsForm>({
    attachments: [],
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    stock: 0,
    store: { name: "", logo_attachment: "" },
  });

  const [quantity, setQuantity] = useState<Number>(0);
  const [dataCart, setDataCart] = useState<any>([]);

  useEffect(() => {
    async function fetchVarian() {
      try {
        console.log("product", product);
        const response = await Axios({
          method: "get",
          url: `${api}/form-produk/${product.product_id}/${product.varian_id}`,
          data: dataOrder,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = {
          attachments: response.data.attachments,
          name: response.data.name,
          price:
            response.data.variants[0].variant_option[0].variant_option_values
              .price,
          quantity: response.data.minimum_order,
          description: response.data.description,
          stock:
            response.data.variants[0].variant_option[0].variant_option_values
              .stock,
          store: {
            name: response.data.store.name,
            logo_attachment: response.data.store.logo_attachment,
          },
        };
        setQuantity(data.quantity);
        setDataOrder(data);
        console.log("ini data order", data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchVarian();
  }, []);

  async function addCart() {
    try {
      const data = {
        // store_id = params.store_id
        attachments: dataOrder.attachments,
        name: dataOrder.name,
        price: dataOrder.price,
        quantity: quantity,
      };

      const response = await Axios({
        method: "post",
        url: `${api}/cart-items/17415d35-170c-4f13-8519-4928e519637e`,
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("ini data post", response.data);
      setDataCart(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="w-full h-full bg-slate-800 p-8">
        <div className="w-full h-full flex p-4">
          <div className="w-full flex justify-center items-center bg-orange-500 rounded-l-lg">
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                {dataOrder.attachments.map((data, index) => (
                  <CarouselItem key={index}>
                    <div className="p-8 shadow">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-2">
                          <img src={data} alt="" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ms-16" />
              <CarouselNext className="me-16" />
            </Carousel>
          </div>

          <div className="w-full flex justify-center bg-white rounded-r-lg">
            <div className="w-full">
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={dataOrder?.store?.logo_attachment}
                    alt="logo"
                    className="w-10"
                  />
                  <h1 className="text-2xl font-bold">
                    {dataOrder?.store?.name}
                  </h1>
                </div>
              </div>

              <div className="p-5 mt-2 mb-6 mx-32 bg-white rounded-lg border shadow-lg">
                <h1 className="font-bold text-2xl">{dataOrder.name}</h1>
                <p>{dataOrder.description}</p>

                <div className="flex gap-10 text-xl mt-10 pb-4 border-b-2 border-b-black">
                  <p>Harga</p>
                  <p>{dataOrder.price}</p>
                </div>

                <div className="flex items-center gap-10 mt-5 text-xl pb-4 border-b-2 border-b-black">
                  <p>Jumlah</p>
                  <div className="flex items-center gap-10 text-xl">
                    {quantity <= dataOrder.quantity ? (
                      <Button
                        className="border text-white border-black w-10 h-11 rounded-md"
                        disabled
                      >
                        -
                      </Button>
                    ) : (
                      <Button
                        className="border text-white border-black w-10 h-11 rounded-md"
                        onClick={() => {
                          setQuantity(Number(quantity) - 1);
                        }}
                        disabled
                      >
                        -
                      </Button>
                    )}

                    <p>{String(quantity)}</p>
                    {quantity >= dataOrder.stock ? (
                      <Button
                        className="border text-white border-black w-10 h-11 rounded-md"
                        disabled
                      >
                        +
                      </Button>
                    ) : (
                      <Button
                        className="border text-white border-black w-10 h-11 rounded-md"
                        onClick={() => {
                          setQuantity(Number(quantity) + 1);
                        }}
                        disabled
                      >
                        +
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex justify-between gap-3 mt-5">
                  <Button className="bg-red-600" disabled>
                    {/* <Link onClick={addCartLangsung} search={{ id: dataCart.id }}> */}
                    Beli Langsung
                    {/* </Link> */}
                  </Button>

                  <Button className="bg-lime-600" disabled>
                    {/* <Link className="flex items-center gap-2 " onClick={addCart}> */}
                    Keranjang{" "}
                    <FaArrowRightFromBracket className="w-4 mt-1 ms-2" />
                    {/* </Link> */}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
