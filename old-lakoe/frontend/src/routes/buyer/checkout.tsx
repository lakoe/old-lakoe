import { CheckoutPage } from "@/buyer/pages/checkout-page";
import { createFileRoute } from "@tanstack/react-router";
import { ProtectedBuyerRoute, ProtectedRoute } from "../__root";

export const Route = createFileRoute("/buyer/checkout")({
  component: () => (
    <ProtectedRoute>
      <ProtectedBuyerRoute>
        <Checkout />
      </ProtectedBuyerRoute>
    </ProtectedRoute>
  ),
});

function Checkout() {
  return (
    <>
      <div className="bg-slate-800 p-4">
        <CheckoutPage />
      </div>
    </>
  );
}
