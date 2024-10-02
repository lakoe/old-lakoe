import { DetailPembayaran } from "@/features/pesanan/components/detail-order/detail-pembayaran";
import { DetailPengiriman } from "@/features/pesanan/components/detail-order/detail-pengiriman";
import { DetailProduk } from "@/features/pesanan/components/detail-order/detail-produk";
import { InfoOrder } from "@/features/pesanan/components/detail-order/info-order";
import { StatusOrder } from "@/features/pesanan/components/detail-order/status-order";
import { SubmitOrder } from "@/features/pesanan/components/detail-order/submit-order";
import { IoIosArrowForward } from "react-icons/io";

export function DetailOrderPage(props: any) {
  return (
    <>
      <div className="flex">
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-white text-l p-3 pr-0">
              Daftar Pesanan
            </h1>{" "}
            <IoIosArrowForward className="text-white text-xs mt-1" />
            <h1 className="font-bold text-white">{props.item?.name}</h1>
          </div>

          <div className="mx-4 bg-white rounded-lg">
            <div className="flex">
              <StatusOrder invoice={props.invoice} />
            </div>
          </div>

          <div className="m-4 bg-white rounded-lg">
            <InfoOrder invoice={props.invoice} user={props.user} />
          </div>

          <div className="m-4 bg-white rounded-lg">
            <div className="flex">
              <DetailProduk item={props.item} />
            </div>
          </div>

          <div className="m-4 bg-white rounded-lg">
            <div className="flex">
              <DetailPengiriman
                user={props.user}
                courier={props.courier}
                invoice={props.invoice}
              />
            </div>
          </div>

          <div className="m-4 bg-white rounded-lg">
            <div className="flex">
              <DetailPembayaran
                invoice={props.invoice}
                item={props.item}
                courier={props.courier}
              />
            </div>
          </div>

          <div className="m-4 bg-white rounded-lg">
            <SubmitOrder invoice={props.invoice} />
          </div>
        </div>
      </div>
    </>
  );
}
