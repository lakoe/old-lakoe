import { MainSetting } from "@/features/mainInformasi";
import { SideBar } from "@/features/side-bar";
import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute, ProtectedSellerRoute } from "../__root";

export const Route = createFileRoute("/seller/atur-toko")({
  component: () => (
    <ProtectedRoute>
      <ProtectedSellerRoute>
        <AturToko />
      </ProtectedSellerRoute>
    </ProtectedRoute>
  ),
});

function AturToko() {
  return (
    <div>
      <div className="w-full h-screen flex bg-[#F6F7D4]">
        <SideBar />
        <div className="w-full h-screen overflow-y-auto">
          <MainSetting></MainSetting>
        </div>
      </div>
    </div>
  );
}
