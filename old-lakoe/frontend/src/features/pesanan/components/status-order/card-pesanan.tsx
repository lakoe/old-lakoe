import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import Axios from "axios";
import { useEffect, useState } from "react";

export const formattedNumber = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);

export function Semua(props: any) {
  const [color, setColor] = useState("");
  const [button, setButton] = useState(<div></div>);
  const [status, setStatus] = useState();

  async function fetchInvoice() {
    try {
      console.log("props", props.invoice?.id);
      const response = await Axios({
        method: "get",
        url: `${api}/form-produk/${props.invoice?.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("inv", response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  const { data: invoiceFetchData, refetch: refetchPesanan } = useQuery({
    queryKey: ["pesananStatus"],
    queryFn: fetchInvoice,
  });

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      return await Axios({
        method: "post",
        url: `${api}/form-produk/order-couriers/${props.invoice?.id}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
  });

  function switchColor(status: any) {
    const stats = status?.toString();
    console.log(stats);
    switch (stats) {
      case "BELUM_DIBAYAR":
        setColor("bg-orange-500");
        setButton(
          <Button className="border bg-lime-500 text-white font-semibold px-4 rounded-full p-4 mt-3">
            <a href={"https://api.whatsapp.com/send/?phone=6285156703211"}>
              Hubungi Pembeli
            </a>
          </Button>
        );
        break;
      case "PESANAN_BARU":
        setColor("bg-yellow-500");
        {
          setButton(
            <button
              onClick={async () => {
                await mutateAsync();
                refetchPesanan();
                // setStatus(invoiceFetchData?.status);
                // switchColor(invoiceFetchData?.status);
              }}
              className="border bg-blue-500 text-white font-semibold px-4 rounded-full p-4 mt-3 me-2"
            >
              Proses Pesanan
            </button>
          );
        }
        break;
      case "SIAP_DIKIRIM":
        setColor("bg-lime-500");
        setButton(
          <Button className="border bg-lime-500 text-white font-semibold px-4 rounded-full p-4 mt-3">
            <a href={"https://api.whatsapp.com/send/?phone=6285156703211"}>
              Hubungi Pembeli
            </a>
          </Button>
        );
        break;
      case "DALAM_PENGIRIMAN":
        setColor("bg-green-500");
        setButton(
          <Button className="border bg-lime-500 text-white font-semibold px-4 rounded-full p-4 mt-3">
            <a href={"https://api.whatsapp.com/send/?phone=6285156703211"}>
              Hubungi Pembeli
            </a>
          </Button>
        );
        break;
      case "PESANAN_SELESAI":
        setColor("bg-blue-500");
        setButton(
          <Button className="border bg-lime-500 text-white font-semibold px-4 rounded-full p-4 mt-3">
            <a href={"https://api.whatsapp.com/send/?phone=6285156703211"}>
              Hubungi Pembeli
            </a>
          </Button>
        );
        break;
      case "DIBATALKAN":
        setColor("bg-red-500");
        setButton(
          <Button className="border bg-lime-500 text-white font-semibold px-4 rounded-full p-4 mt-3">
            <a href={"https://api.whatsapp.com/send/?phone=6285156703211"}>
              Hubungi Pembeli
            </a>
          </Button>
        );
        break;
    }
  }

  useEffect(() => {
    const fetchAndSwitch = async () => {
      const invoiceData = await fetchInvoice();
      if (invoiceData) {
        setStatus(invoiceData.status);
        switchColor(invoiceData.status);
      }
    };
    console.log("props ", props?.invoice);
    fetchAndSwitch();
  }, [props.invoice?.id, invoiceFetchData]);

  // useEffect(() => {
  //   console.log("refetch pesanan");
  //   setStatus(invoiceFetchData?.status);
  //   switchColor(invoiceFetchData?.status);
  // }, [invoiceFetchData]);
  return (
    <>
      <div className="border rounded-lg mb-3">
        <div className="border-b">
          <div className="flex justify-between">
            <div className="p-2">
              <div
                className={`${color} w-44 rounded-sm text-white flex justify-center items-center p-2 font-semibold`}
              >
                <p>{status && status}</p>
              </div>
              <p>INV/{props.invoice.id}</p>
            </div>
            <div className="pe-2">{button}</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex p-2 gap-3">
              <img
                src={props.invoice.cart.carts_items[0]?.img}
                alt="cardImage"
                className="w-20"
              />
              <div>
                <p className="font-bold">
                  <Link
                    to="/seller/detail-order"
                    search={{ id: props.invoice.id, itemID: props.items.id }}
                  >
                    {props.items.name}
                  </Link>
                </p>
                <p className="font-light">{props.items.quantity} Barang</p>
              </div>
            </div>

            <div className="p-2">
              <p className="font-light">Total Belanja</p>
              <p className="font-bold">
                {formattedNumber(
                  props.invoice.prices + props.invoice.service_charge
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function BelumDibayar(props: any) {
  return (
    <>
      <div className="border rounded-lg mb-3">
        <div className="border-b">
          <div className="flex justify-between">
            <div className="p-2">
              <div className="bg-orange-500 w-40 rounded-sm text-white flex justify-center items-center p-2 font-semibold">
                <p>{props.invoice.status}</p>
              </div>
              <p>INV/{props.invoice.id}</p>
            </div>
            <div className="p-2">
              {/* `https://api.whatsapp.com/send/?phone=${props.invoice.user.phone}` */}
              <a
                href={"https://api.whatsapp.com/send/?phone=6285156703211"}
                className="border rounded-full py-1 px-3"
              >
                Hubungi Pembeli
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex p-2 gap-3">
              <img
                src={props.invoice.cart.carts_items[0]?.img}
                alt="cardImage"
                className="w-20"
              />
              <div>
                <p className="font-bold">
                  <Link
                    to="/seller/detail-order"
                    search={{ id: props.invoice.id, itemID: props.items.id }}
                  >
                    {props.items.name}
                  </Link>
                </p>
                <p className="font-light">{props.items.quantity} Barang</p>
              </div>
            </div>

            <div className="p-2">
              <p className="font-light">Total Belanja</p>
              <p className="font-bold">
                {formattedNumber(
                  props.invoice.prices + props.invoice.service_charge
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PesananBaru(props: any) {
  return (
    <>
      <div className="border rounded-lg mb-3">
        <div className="border-b">
          <div className="flex justify-between">
            <div className="p-2">
              <Button
                size={"sm"}
                className="bg-yellow-500 w-40 rounded-sm text-white flex justify-center items-center p-2 font-semibold"
              >
                <p>{props.invoice.status}</p>
              </Button>
              <p>INV/{props.invoice.id}</p>
            </div>
            <div className="p-2">
              <button className="border rounded-full py-1 px-3">
                Proses Pesanan
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex p-2 gap-3">
              <img
                src={props.invoice.cart.carts_items[0]?.img}
                alt="cardImage"
                className="w-20"
              />
              <div>
                <p className="font-bold">
                  <Link
                    to="/seller/detail-order"
                    search={{ id: props.invoice.id, itemID: props.items.id }}
                  >
                    {props.items.name}
                  </Link>
                </p>
                <p className="font-light">{props.items.quantity} Barang</p>
              </div>
            </div>

            <div className="p-2">
              <p className="font-light">Total Belanja</p>
              <p className="font-bold">
                {formattedNumber(
                  props.invoice.prices + props.invoice.service_charge
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SiapDikirim(props: any) {
  return (
    <>
      <div className="border rounded-lg mb-3">
        <div className="border-b">
          <div className="flex justify-between">
            <div className="p-2">
              <Button
                size={"sm"}
                className="bg-blue-500w-40 rounded-sm text-white flex justify-center items-center p-2 font-semibold"
              >
                {props.invoice.status}
              </Button>
              <p>INV/{props.invoice.id}</p>
            </div>
            <div className="p-2">
              <button className="border rounded-full py-1 px-3">
                Hubungi Pembeli
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex p-2 gap-3">
              <img
                src={props.invoice.cart.carts_items[0]?.img}
                alt="cardImage"
                className="w-20"
              />
              <div>
                <p className="font-bold">
                  <Link
                    to="/seller/detail-order"
                    search={{ id: props.invoice.id, itemID: props.items.id }}
                  >
                    {props.items.name}
                  </Link>
                </p>
                <p className="font-light">{props.items.quantity} Barang</p>
              </div>
            </div>

            <div className="p-2">
              <p className="font-light">Total Belanja</p>
              <p className="font-bold">
                {formattedNumber(
                  props.invoice.prices + props.invoice.service_charge
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function DalamPengiriman(props: any) {
  return (
    <>
      <div className="border rounded-lg mb-3">
        <div className="border-b">
          <div className="flex justify-between">
            <div className="p-2">
              <Button
                size={"sm"}
                className="bg-orange-500 w-40 rounded-sm text-white flex justify-center items-center p-2 font-semibold"
              >
                {props.invoice.status}
              </Button>
              <p>INV/{props.invoice.id}</p>
            </div>
            <div className="p-2">
              <button className="border rounded-full py-1 px-3">
                Lihat Rincian Pengiriman
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex p-2 gap-3">
              <img
                src={props.invoice.cart.carts_items[0]?.img}
                alt="cardImage"
                className="w-20"
              />
              <div>
                <p className="font-bold">
                  <Link
                    to="/seller/detail-order"
                    search={{ id: props.invoice.id, itemID: props.items.id }}
                  >
                    {props.items.name}
                  </Link>
                </p>
                <p className="font-light">{props.items.quantity} Barang</p>
              </div>
            </div>

            <div className="p-2">
              <p className="font-light">Total Belanja</p>
              <p className="font-bold">
                {formattedNumber(
                  props.invoice.prices + props.invoice.service_charge
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PesananSelesai(props: any) {
  return (
    <>
      <div className="border rounded-lg mb-3">
        <div className="border-b">
          <div className="flex justify-between">
            <div className="p-2">
              <Button
                size={"sm"}
                className="bg-gray-500 w-40 rounded-sm text-white flex justify-center items-center p-2 font-semibold"
              >
                {props.invoice.status}
              </Button>
              <p>INV/{props.invoice.id}</p>
            </div>
            <div className="p-2">
              <button className="border rounded-full py-1 px-3">
                Hubungi Pembeli
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex p-2 gap-3">
              <img
                src={props.invoice.cart.carts_items[0]?.img}
                alt="cardImage"
                className="w-20"
              />
              <div>
                <p className="font-bold">
                  <Link
                    to="/seller/detail-order"
                    search={{ id: props.invoice.id, itemID: props.items.id }}
                  >
                    {props.items.name}
                  </Link>
                </p>
                <p className="font-light">{props.items.quantity} Barang</p>
              </div>
            </div>

            <div className="p-2">
              <p className="font-light">Total Belanja</p>
              <p className="font-bold">
                {formattedNumber(
                  props.invoice.prices + props.invoice.service_charge
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Dibatalkan(props: any) {
  return (
    <>
      <div className="border rounded-lg mb-3">
        <div className="border-b">
          <div className="flex justify-between">
            <div className="p-2">
              <Button size={"sm"} className="bg-red-500 rounded-sm text-white">
                {props.invoice.status}
              </Button>
              <p>INV/{props.invoice.id}</p>
            </div>
            <div className="p-2">
              <button className="border rounded-full py-1 px-3">
                Hubungi Pembeli
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex p-2 gap-3">
              <img
                src={props.invoice.cart.carts_items[0]?.img}
                alt="cardImage"
                className="w-20"
              />
              <div>
                <p className="font-bold">
                  <Link
                    to="/seller/detail-order"
                    search={{ id: props.invoice.id, itemID: props.items.id }}
                  >
                    {props.items.name}
                  </Link>
                </p>
                <p className="font-light">{props.items.quantity} Barang</p>
              </div>
            </div>

            <div className="p-2">
              <p className="font-light">Total Belanja</p>
              <p className="font-bold">
                {formattedNumber(
                  props.invoice.prices + props.invoice.service_charge
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
