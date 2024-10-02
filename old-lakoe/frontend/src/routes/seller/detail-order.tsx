import { SideBar } from "@/features/side-bar";
import { createFileRoute } from "@tanstack/react-router";
import Axios from "axios";
import { useEffect, useState } from "react";
import { DetailOrderPage } from "../../pages/detailOrder/detail-order-page";
import { ProtectedRoute, ProtectedSellerRoute } from "../__root";
import { api } from "@/lib/api";

export const Route = createFileRoute("/seller/detail-order")({
  component: () => (
    <ProtectedRoute>
      <ProtectedSellerRoute>
        <DetailOrder />
      </ProtectedSellerRoute>
    </ProtectedRoute>
  ),
});

type invoiceID = {
  id: string;
  itemID: string;
};

type user = {
  name: string;
};

type cart = {
  carts_items: items[];
};

type items = {
  created_at: Date;
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
};

type courier = {
  courier_code: string;
  courier_service_name: string;
  tracking_id: string;
  price: number;
};

type invoice = {
  id: string;
  updated_at: Date;
  user: user;
  cart: cart;
  courier: courier;
};

function DetailOrder() {
  const params: invoiceID = Route.useSearch();
  const [detailData, setDetailData] = useState<invoice>();
  const [itemsData, setItemsData] = useState<items>();

  useEffect(() => {
    async function getInvoices() {
      const response = await Axios({
        method: "get",
        url: `${api}/product/invoice/${params.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDetailData(response.data);
    }
    async function getItem() {
      const response = await Axios({
        method: "get",
        url: `${api}/product/items/${params.itemID}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setItemsData(response.data);
    }
    getInvoices();
    getItem();
  }, []);

  return (
    <div>
      <div className="w-full h-auto flex bg-slate-800">
        <SideBar />
        <div className="w-full h-screen overflow-y-auto">
          <DetailOrderPage
            invoice={detailData}
            user={detailData?.user}
            item={itemsData}
            courier={detailData?.courier}
          ></DetailOrderPage>
        </div>
      </div>
    </div>
  );
}
