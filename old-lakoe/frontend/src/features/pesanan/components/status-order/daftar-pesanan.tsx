import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useStore from "@/z-context";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Semua } from "./card-pesanan";
import { CollapsibleVariant } from "./collapsible-variant";
import { api } from "@/lib/api";

export function DaftarPesanan() {
  const [invoiceData, setInvoiceData] = useState<any[]>([]);
  const [invoiceOriData, setInvoiceOriData] = useState<any[]>([]);
  const [invoiceBelumData, setInvoiceBelumData] = useState<any[]>([]);
  const [invoiceBaruData, setInvoiceBaruData] = useState<any[]>([]);
  const [invoiceSiapDikirimData, setInvoiceSiapDikirimData] = useState<any[]>(
    []
  );
  const [invoiceDalamKirimData, setInvoiceDalamKirimData] = useState<any[]>([]);
  const [invoiceSelesaiData, setInvoiceSelesaiData] = useState<any[]>([]);
  const [invoiceBatalData, setInvoiceBatalData] = useState<any[]>([]);
  const [kurir, setKurir] = useState("");
  const [searchPesanan, setSearchPesanan] = useState(" ");

  const user = useStore((state) => state.user);
  //9 == all
  const [status, setStatus] = useState(9);
  const [order, setOrder] = useState(1);

  useEffect(() => {
    async function auth() {
      try {
        const response = await Axios({
          method: "get",
          url: `${api}/form-produk/pesanan/${user.store_id}/9/${order}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        console.log("data", data);
        setInvoiceData(data);
        setInvoiceOriData(data);
      } catch (error) {
        console.log(error);
      }
    }

    auth();
  }, [order]);

  useEffect(() => {
    let filteredData = [...invoiceOriData];

    if (searchPesanan) {
      filteredData = filteredData
        .filter((value) =>
          value.cart.carts_items.some((item: any) =>
            item.name.toLowerCase().includes(searchPesanan.toLowerCase())
          )
        )
        .map((value) => ({
          ...value,
          cart: {
            ...value.cart,
            carts_items: value.cart.carts_items.filter((item: any) =>
              item.name.toLowerCase().includes(searchPesanan.toLowerCase())
            ),
          },
        }));
    }

    if (kurir) {
      console.log("kurir", kurir);
      filteredData = filteredData.filter(
        (value) => value.courier?.courier_code === kurir
      );
    }

    setInvoiceData(filteredData);
    setInvoiceBelumData(
      filteredData.filter((value) => value.status === "BELUM_DIBAYAR")
    );
    setInvoiceBaruData(
      filteredData.filter((value) => value.status === "PESANAN_BARU")
    );
    setInvoiceSiapDikirimData(
      filteredData.filter((value) => value.status === "SIAP_DIKIRIM")
    );
    setInvoiceDalamKirimData(
      filteredData.filter((value) => value.status === "DALAM_PENGIRIMAN")
    );
    setInvoiceSelesaiData(
      filteredData.filter((value) => value.status === "PESANAN_SELESAI")
    );
    setInvoiceBatalData(
      filteredData.filter((value) => value.status === "DIBATALKAN")
    );
  }, [searchPesanan, kurir]);

  return (
    <>
      <div>
        <h1 className="font-bold text-2xl p-4 ps-8 pt-8">Daftar Pesanan</h1>

        <div className="border-b-2 pr-3 pl-3 pb-3">
          <Tabs defaultValue="9" onValueChange={(e) => setStatus(Number(e))}>
            <div className="flex justify-center">
              <div className="rounded-md border">
                <TabsList className="bg-white">
                  <TabsTrigger value="9">
                    <div className="bg-blue-800 text-white w-6 h-6 rounded-full text-center leading-6 mr-1">
                      {invoiceOriData.length}
                    </div>
                    <p>Semua</p>
                  </TabsTrigger>
                  <TabsTrigger value="0">
                    {invoiceBelumData && (
                      <div className="bg-blue-800 text-white w-6 h-6 rounded-full leading-6 mr-1">
                        {
                          invoiceOriData.filter((value: any) => {
                            return value.status === "BELUM_DIBAYAR";
                          }).length
                        }
                      </div>
                    )}
                    <p>Belum Dibayar</p>
                  </TabsTrigger>
                  <TabsTrigger value="1">
                    {invoiceBaruData && (
                      <div className="bg-blue-800 text-white w-6 h-6 rounded-full leading-6 mr-1">
                        {
                          invoiceOriData.filter((value: any) => {
                            return value.status === "PESANAN_BARU";
                          }).length
                        }
                      </div>
                    )}
                    <p>Pesanan Baru</p>
                  </TabsTrigger>
                  <TabsTrigger value="2">
                    {invoiceSiapDikirimData && (
                      <div className="bg-blue-800 text-white w-6 h-6 rounded-full leading-6 mr-1">
                        {
                          invoiceOriData.filter((value: any) => {
                            return value.status === "SIAP_DIKIRIM";
                          }).length
                        }
                      </div>
                    )}
                    <p>Siap Dikirim</p>
                  </TabsTrigger>
                  <TabsTrigger value="3">
                    {invoiceDalamKirimData && (
                      <div className="bg-blue-800 text-white w-6 h-6 rounded-full leading-6 mr-1">
                        {
                          invoiceOriData.filter((value: any) => {
                            return value.status === "DALAM_PENGIRIMAN";
                          }).length
                        }
                      </div>
                    )}
                    <p>Dalam Pengiriman</p>
                  </TabsTrigger>
                  <TabsTrigger value="4">
                    {invoiceSelesaiData && (
                      <div className="bg-blue-800 text-white w-6 h-6 rounded-full leading-6 mr-1">
                        {
                          invoiceOriData.filter((value: any) => {
                            return value.status === "PESANAN_SELESAI";
                          }).length
                        }
                      </div>
                    )}
                    <p>Pesanan Selesai</p>
                  </TabsTrigger>
                  <TabsTrigger value="5">
                    {invoiceBatalData && (
                      <div className="bg-blue-800 text-white w-6 h-6 rounded-full leading-6 mr-1">
                        {
                          invoiceOriData.filter((value: any) => {
                            return value.status === "DIBATALKAN";
                          }).length
                        }
                      </div>
                    )}
                    <p>Dibatalkan</p>
                  </TabsTrigger>
                </TabsList>
                {/* <ScrollBar orientation="horizontal" /> */}
              </div>
            </div>

            <div className="p-3">
              <form>
                <div className="flex gap-3 justify-between">
                  <Input
                    type="text"
                    placeholder="Cari Pesanan"
                    onChange={(e) => setSearchPesanan(e.target.value)}
                  />
                  {/* <Select onValueChange={(e) => setKurir(e)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kurir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grab">Grab</SelectItem>
                      <SelectItem value="tiki">TIKI</SelectItem>
                      <SelectItem value="gojek">Gojek</SelectItem>
                      <SelectItem value="jne">JNE</SelectItem>
                    </SelectContent>
                  </Select> */}
                  <Select onValueChange={(e) => setOrder(Number(e))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Urutkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Paling Lama</SelectItem>
                      <SelectItem value="2">Paling Baru</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </div>

            <TabsContent value="9">
              {invoiceData &&
                invoiceData.map((value: any) => {
                  if (value.cart.carts_items.length === 1)
                    return value.cart.carts_items.map((carts_item: any) => (
                      <Semua invoice={value} items={carts_item} />
                    ));

                  return (
                    <CollapsibleVariant
                      invoice={value}
                      value={value.cart.carts_items}
                    />
                  );
                })}
            </TabsContent>
            <TabsContent value="0">
              {invoiceBelumData &&
                invoiceBelumData.map((value: any) => {
                  if (value.cart.carts_items.length === 1)
                    return value.cart.carts_items.map((carts_item: any) => (
                      <Semua invoice={value} items={carts_item} />
                    ));

                  return (
                    <CollapsibleVariant
                      invoice={value}
                      value={value.cart.carts_items}
                    />
                  );
                })}
            </TabsContent>
            <TabsContent value="1">
              {invoiceBaruData &&
                invoiceBaruData.map((value: any) => {
                  if (value.cart.carts_items.length === 1)
                    return value.cart.carts_items.map((carts_item: any) => (
                      <Semua invoice={value} items={carts_item} />
                    ));

                  return (
                    <CollapsibleVariant
                      invoice={value}
                      value={value.cart.carts_items}
                    />
                  );
                })}
            </TabsContent>
            <TabsContent value="2">
              {invoiceSiapDikirimData &&
                invoiceSiapDikirimData.map((value: any) => {
                  if (value.cart.carts_items.length === 1)
                    return value.cart.carts_items.map((carts_item: any) => (
                      <Semua invoice={value} items={carts_item} />
                    ));

                  return (
                    <CollapsibleVariant
                      invoice={value}
                      value={value.cart.carts_items}
                    />
                  );
                })}
            </TabsContent>
            <TabsContent value="3">
              {invoiceDalamKirimData &&
                invoiceDalamKirimData.map((value: any) => {
                  if (value.cart.carts_items.length === 1)
                    return value.cart.carts_items.map((carts_item: any) => (
                      <Semua invoice={value} items={carts_item} />
                    ));

                  return (
                    <CollapsibleVariant
                      invoice={value}
                      value={value.cart.carts_items}
                    />
                  );
                })}
            </TabsContent>
            <TabsContent value="4">
              {invoiceSelesaiData &&
                invoiceSelesaiData.map((value: any) => {
                  if (value.cart.carts_items.length === 1)
                    return value.cart.carts_items.map((carts_item: any) => (
                      <Semua invoice={value} items={carts_item} />
                    ));

                  return (
                    <CollapsibleVariant
                      invoice={value}
                      value={value.cart.carts_items}
                    />
                  );
                })}
            </TabsContent>
            <TabsContent value="5">
              {invoiceBatalData &&
                invoiceBatalData.map((value: any) => {
                  if (value.cart.carts_items.length === 1)
                    return value.cart.carts_items?.map((carts_item: any) => (
                      <Semua invoice={value} items={carts_item} />
                    ));

                  return (
                    <CollapsibleVariant
                      invoice={value}
                      value={value.cart.carts_items}
                    />
                  );
                })}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
