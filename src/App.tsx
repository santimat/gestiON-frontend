import { lazy } from "react";
import { Routes, Route, Outlet } from "react-router";

import "@/global.css";
import { GuestRoute } from "@/routes/GuestRoute";
import { MainLayout } from "@/layouts/MainLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

const LandingPage = lazy(() =>
  import("@/pages/Landing").then((module) => ({ default: module.LandingPage })),
);

const AuthPage = lazy(() =>
  import("@/pages/Auth").then((module) => ({ default: module.AuthPage })),
);

const CashiersPage = lazy(() =>
  import("@/pages/Cashiers").then((module) => ({ default: module.Cashiers })),
);

const ProductsPage = lazy(() =>
  import("@/pages/Products").then((module) => ({ default: module.Products })),
);

const CommercesPage = lazy(() =>
  import("@/pages/Commerces").then((module) => ({
    default: module.Commerces,
  })),
);

const SellPage = lazy(() =>
  import("@/pages/Sell").then((module) => ({ default: module.Sell })),
);

const ClientsPage = lazy(() =>
  import("@/pages/Clients").then((module) => ({ default: module.Clients })),
);

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
        </Route>
        <Route
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
          }
        >
          <Route element={<ProtectedRoute allowedRoles={["SUDO"]} />}>
            <Route path="/commerces" element={<CommercesPage />} />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["CASHIER", "OWNER"]} />}
          >
            <Route path="/sell" element={<SellPage />} />
            <Route path="/dashboard" element={<p>hola</p>} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cashiers" element={<CashiersPage />} />
            <Route path="/clients" element={<ClientsPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
