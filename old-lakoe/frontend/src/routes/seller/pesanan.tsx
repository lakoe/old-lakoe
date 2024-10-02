import { SideBar } from "@/features/side-bar";
import { createFileRoute } from "@tanstack/react-router";
import { PesananPage } from "../../pages/order/pesanan-page";
import { ProtectedRoute, ProtectedSellerRoute } from "../__root";

export const Route = createFileRoute("/seller/pesanan")({
  component: () => (
    <ProtectedRoute>
      <ProtectedSellerRoute>
        <Pesanan />
      </ProtectedSellerRoute>
    </ProtectedRoute>
  ),
});

function Pesanan() {
  return (
    <div>
      <div className="w-full h-screen flex bg-slate-800">
        <SideBar />
        <div className="w-full p-4 h-screen overflow-y-scroll">
          <PesananPage></PesananPage>
        </div>
      </div>
    </div>
  );
}
