import { AddCartPage } from "@/buyer/pages/add-cart-page";
import { createFileRoute } from "@tanstack/react-router";
import { ProtectedBuyerRoute, ProtectedRoute } from "../__root";

export const Route = createFileRoute("/buyer/add-cart")({
  component: () => (
    <ProtectedRoute>
      <ProtectedBuyerRoute>
        <Dashboard />
      </ProtectedBuyerRoute>
    </ProtectedRoute>
  ),
});

function Dashboard() {
  return (
    <>
      <AddCartPage />
    </>
  );
}
