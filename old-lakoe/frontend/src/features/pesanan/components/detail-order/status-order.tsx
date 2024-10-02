import { useEffect, useState } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiwayatPesanan } from "./riwayat-pesanan";

export function StatusOrder(props: any) {
  const [color, setColor] = useState("");
  const [date, setDate] = useState<string>();

  function switchColor(status: any) {
    const stats = status?.toString();
    switch (stats) {
      case "BELUM_DIBAYAR":
        setColor("bg-orange-500");
        break;
      case "PESANAN_BARU":
        setColor("bg-yellow-500");
        break;
      case "SIAP_DIKIRIM":
        setColor("bg-lime-500");
        break;
      case "DALAM_PENGIRIMAN":
        setColor("bg-green-500");
        break;
      case "PESANAN_SELESAI":
        setColor("bg-blue-500");
        break;
      case "DIBATALKAN":
        setColor("bg-red-500");
        break;
    }
  }

  useEffect(() => {
    switchColor(props.invoice?.status);
    const date = new Date(props.invoice?.created_at);
    date.setDate(date.getDate() + 3);

    setDate(date.toString());
  }, [props.invoice?.status]);

  return (
    <>
      <div className="py-4 px-3 text-2xl">
        <HiOutlineClipboardList />
      </div>
      <div className="p-3 pl-0">
        <div
          className={`${color} w-40 rounded-sm text-white flex justify-center items-center p-2 font-semibold`}
        >
          <p>{props.invoice?.status}</p>
        </div>
        <p className="my-2">
          Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai{" "}
          {date?.toString()}. Silakan tunggu sampai pembayaran terkonfirmasi
          sebelum mengirimkan barang.
        </p>

        <RiwayatPesanan
          status={props.invoice?.status}
          invoice={props.invoice}
        />
      </div>
    </>
  );
}
