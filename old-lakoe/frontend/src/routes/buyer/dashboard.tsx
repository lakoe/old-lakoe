import { createFileRoute } from "@tanstack/react-router";
import { ProtectedBuyerRoute, ProtectedRoute } from "../__root";
import { BuyerDashboardPage } from "@/pages/buyer/buyer-dashboard-page";

export const Route = createFileRoute("/buyer/dashboard")({
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
      <BuyerDashboardPage />
    </>
  );
}
