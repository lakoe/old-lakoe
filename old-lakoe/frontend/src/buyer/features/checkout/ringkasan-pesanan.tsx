import { formattedNumber } from "@/features/pesanan/components/status-order/card-pesanan";
import { api } from "@/lib/api";
import { Route } from "@/routes/buyer/checkout";
import useStore from "@/z-context";
import Axios from "axios";
import { useEffect, useState } from "react";

interface paramsTypes {
  id: string;
}

interface productItemsForm {
  img: string;
  name: string;
  price: number;
  quantity: number;
  // stock: number;
  amount: number;
  store_id: string;
}

export function RingkasanPesanan(props: any) {
  const params: paramsTypes = Route.useSearch();
  const disc = useStore((state) => state.discount);
  const setTotal = useStore((state) => state.SET_TOTAL);
  const selectedCourier = useStore((state) => state.selectedCourier);
  const [totalPrice, setTotalPrice] = useState(0);
  // console.log("ini kurir dipilih", selectedCourier);

  const [dataProduct, setDataProduct] = useState<productItemsForm>({
    img: "",
    name: "",
    price: 0,
    quantity: 0,
    // stock: 0,
    amount: 0,
    store_id: "",
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await Axios({
          method: "get",
          url: `${api}/cart-items/${params.id}`,
          data: dataProduct,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data: productItemsForm = {
          img: response.data.img,
          name: response.data.name,
          price: response.data.price,
          quantity: response.data.quantity,
          // stock: response.data.stock,
          amount: response.data.price * response.data.quantity,
          store_id: response.data.store_id,
        };

        console.log("data", response.data);

        setDataProduct(data);
        props.form?.setValue(
          "prices",
          response.data.price * response.data.quantity
        );
        props.form?.setValue("store_id", data.store_id);

        // console.log("ringkasan pesanan", data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, []);

  useEffect(() => {
    const productAmount = dataProduct.amount;
    const shippingCost = selectedCourier?.price || 0;
    const discountAmount = disc ? dataProduct.amount * (disc.amount / 100) : 0;
    setTotalPrice(productAmount + shippingCost - discountAmount);
    setTotal(productAmount - discountAmount);
  }, [dataProduct, selectedCourier, disc]);

  return (
    <>
      <div className="bg-white shadow w-5/6 rounded-lg p-6 mb-4">
        <p className="font-bold text-lg mb-4">Ringkasan Pesanan</p>

        <div className="mt-3 flex gap-3 items-center">
          <img
            src={dataProduct.img}
            alt="image"
            className="w-3/12 rounded-sm me-4"
          />

          <div className="">
            <p className="text-xl font-semibold">{dataProduct.name}</p>
            <p className="">{dataProduct.quantity} Item</p>
            <p className="font-bold text-lg">
              {formattedNumber(dataProduct.price)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center my-4">
          <p className="font-semibold">Total Harga ({dataProduct.quantity})</p>
          <p className="font-bold">{formattedNumber(dataProduct.amount)}</p>
        </div>

        {selectedCourier?.price ? (
          <div className="flex justify-between items-center pb-4 border-b-2">
            <p className="font-semibold">Biaya Pengiriman</p>
            <p className="font-bold">
              {formattedNumber(selectedCourier?.price)}
            </p>
          </div>
        ) : (
          <div className="flex justify-between items-center border-b-2 border-white"></div>
        )}

        {disc ? (
          <div className="flex justify-between items-center pb-4 border-b-2 border-white mt-2">
            <p className="font-semibold">Discount</p>
            <p className="font-bold">
              {formattedNumber(dataProduct.amount * (disc.amount / 100))}
            </p>
          </div>
        ) : (
          <div className="flex justify-between items-center border-b-2"></div>
        )}

        <div className="flex justify-between items-center my-4">
          <p className="font-semibold text-lg">
            Total Pembayaran ({dataProduct.quantity})
          </p>
          <p className="font-bold text-lg ">{formattedNumber(totalPrice)}</p>
        </div>
      </div>
    </>
  );
}
