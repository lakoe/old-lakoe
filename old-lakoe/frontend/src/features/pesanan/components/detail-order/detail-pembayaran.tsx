import { IoWalletOutline } from "react-icons/io5";
import { formattedNumber } from "../status-order/card-pesanan";

export function DetailPembayaran(props: any) {
  console.log("PROPS", props.invoice);
  return (
    <>
      <div className="py-4 px-3 text-2xl">
        <IoWalletOutline />
      </div>

      <div className="w-full">
        <p className="font-bold mt-4">Rincian Pembayaran</p>

        <div className="mb-2 pb-2 mr-5 border-b-2">
          <div className="flex justify-between">
            <p>Total Harga ({props.item?.quantity} Barang)</p>
            <p>{formattedNumber(props.item?.quantity * props.item?.price)}</p>
          </div>

          <div className="flex justify-between">
            <p>Total Ongkos Kirim (10Kg)</p>
            <p>{formattedNumber(props.courier?.price)}</p>
          </div>

          <div className="flex justify-between">
            <p>Diskon</p>
            <p>
              {formattedNumber(
                (props.invoice?.discount?.amount / 100) *
                  (props.item?.quantity * props.item?.price)
              )}
            </p>
          </div>

          <div className="flex justify-between">
            <p>Biaya Layanan</p>
            <p>-</p>
          </div>
        </div>

        <div className="flex justify-between mb-2 pb-2 mr-5">
          <p className="font-bold">Rincian Pembayaran</p>
          <p className="font-bold">
            {formattedNumber(
              props.invoice?.prices + props.invoice?.service_charge
            )}
          </p>
        </div>
      </div>
    </>
  );
}
