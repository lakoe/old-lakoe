import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegCopy } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { ListRiwayatPesanan } from "./list-riwayat-pesanan";

export function DetailPengiriman(props: any) {
  return (
    <>
      <div className="py-4 px-3 text-2xl">
        <TbTruckDelivery />
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mr-5">
          <p className="font-bold mt-4">Detail Pengiriman</p>

          <Dialog>
            <DialogTrigger asChild>
              <h2 className="font-bold text-blue-500 text-l flex items-center gap-2 cursor-pointer">
                Lacak Pengiriman
              </h2>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Lacak Pengiriman</DialogTitle>
                <DialogDescription>
                  <div className="flex justify-between mx-2">
                    <div className="text-xs text-black">
                      <div className="mb-2">
                        <p>Kurir</p>
                        <p className="font-bold">
                          {props.courier?.courier_code}{" "}
                          {props.courier?.courier_service_name}
                        </p>
                      </div>

                      <div className="mb-2">
                        <p className="flex gap-2 items-center">
                          No. Resi <FaRegCopy />
                        </p>
                        <p className="font-bold">
                          {props.courier?.tracking_id}
                        </p>
                      </div>

                      <div>
                        <p>Pengirim</p>
                        <p className="font-bold">{props.user?.name}</p>
                      </div>
                    </div>

                    <div className="text-xs text-black">
                      <p>Penerima</p>
                      <p className="font-bold">{props.user?.name}</p>
                      <p>{props.invoice?.receiver_district}</p>
                      <p>{props.user?.phone}</p>
                    </div>
                  </div>

                  <div className="text-xs text-black my-3">
                    <p>
                      Status:{" "}
                      <span className="font-bold">{props.invoice?.status}</span>
                    </p>

                    <div className="w-full">
                      <ListRiwayatPesanan />
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="pb-3">
          <div className="flex">
            <p className="w-60">Kurir</p>
            <p>
              {props.courier?.courier_code}{" "}
              {props.courier?.courier_service_name}
            </p>
          </div>

          <div className="flex">
            <p className="w-60 flex gap-2 items-center">
              No. Resi <FaRegCopy />
            </p>
            <p>{props.courier?.tracking_id}</p>
          </div>

          <div className="flex">
            <p className="w-60">
              <div className="flex gap-2 items-center">
                Alamat <FaRegCopy />
              </div>
            </p>
            <div>
              <p>{props.invoice?.receiver_district}</p>
              <p>{props.user?.receiver_address}</p>
              <p>{props.user?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
