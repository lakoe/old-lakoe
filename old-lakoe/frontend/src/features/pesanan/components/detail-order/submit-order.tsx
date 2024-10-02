import { Button } from "@/components/button";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import Axios from "axios";

export function SubmitOrder(props: any) {
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

  const { refetch: refetchPesanan } = useQuery({
    queryKey: ["pesananStatus"],
    queryFn: fetchInvoice,
  });

  const order = useMutation({
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

  const batalkan = useMutation({
    mutationFn: async () => {
      return await Axios({
        method: "post",
        url: `${api}/form-produk/batalkan/${props.invoice?.id}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
  });
  return (
    <>
      <div className="flex justify-between p-4">
        {props.invoice?.status === "BELUM_DIBAYAR" && (
          <Button
            className="border-2 px-2 py-1 rounded-full text-white font-bold bg-red-500"
            onClick={async () => {
              await batalkan.mutateAsync();
              refetchPesanan();
            }}
          >
            Tolak Pesanan
          </Button>
        )}
        {props.invoice?.status === "PESANAN_BARU" && (
          <Button
            className="border bg-blue-500 text-white font-semibold px-4 rounded-full p-4 me-2"
            onClick={async () => {
              await order.mutateAsync();
              refetchPesanan();
            }}
          >
            Proses Pesanan
          </Button>
        )}
        {props.invoice?.status !== "PESANAN_BARU" &&
          props.invoice?.status !== "PESANAN_BARU" && (
            <Button className="border bg-lime-500 text-white font-semibold px-4 rounded-full p-4  me-2">
              <a href={"https://api.whatsapp.com/send/?phone=6285156703211"}>
                Hubungi Pembeli
              </a>
            </Button>
          )}
      </div>
    </>
  );
}
