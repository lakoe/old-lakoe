import { BsBoxSeam } from "react-icons/bs";
import { formattedNumber } from "../status-order/card-pesanan";

export function DetailProduk(props : any) {
  return (
    <>
      <div className="py-4 px-3 text-xl">
        <BsBoxSeam />
      </div>

      <div className="pb-3">
        <p className="font-bold mt-3">Detail Produk</p>

        <div className="border w-full m-2 flex justify-between">
          <div className="flex p-2 gap-3">
            <img
              src={props.item?.img}
              alt="cardImage"
              className="w-20"
            />
            <div>
              <p className="font-bold">
                {props.item?.name}
              </p>
              <p className="font-light">{props.item?.quantity} Barang</p>
            </div>
          </div>

          <div className="p-2">
            <p className="font-light">Total Belanja</p>
            <p className="font-bold">{formattedNumber(props.item?.quantity*props.item?.price)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
