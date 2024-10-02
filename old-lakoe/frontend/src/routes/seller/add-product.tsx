import { FormProdukBaru } from "@/features/form-produk-baru";
import { SideBar } from "@/features/side-bar";
import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute, ProtectedSellerRoute } from "../__root";

export const Route = createFileRoute("/seller/add-product")({
  component: () => (
    <ProtectedRoute>
      <ProtectedSellerRoute>
        <AddProduct />
      </ProtectedSellerRoute>
    </ProtectedRoute>
  ),
});

function AddProduct() {
  return (
    <div className="w-full h-screen flex bg-slate-800">
      <SideBar />
      <div className="w-full h-screen overflow-y-auto p-4">
        <FormProdukBaru></FormProdukBaru>
      </div>
    </div>
  );
}
