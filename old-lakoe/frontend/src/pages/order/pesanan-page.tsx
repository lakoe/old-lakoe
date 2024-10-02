import { DaftarPesanan } from "@/features/pesanan/components/status-order/daftar-pesanan";

export function PesananPage() {
  return (
    <>
      <div className="flex w-full">
        <div className=" bg-white shadow-sm shadow-black rounded-sm w-full">
          <DaftarPesanan />
        </div>
      </div>
    </>
  );
}
