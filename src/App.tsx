import { lazy } from "react";
import { Routes, Route, Outlet } from "react-router";

import "@/global.css";
import { GuestRoute } from "@/routes/GuestRoute";
import { MainLayout } from "@/layouts/MainLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { getRolesForRoute } from "@/utils/constants";

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

const UnauthorizedPage = lazy(() =>
  import("@/components/UnauthorizedPage").then((module) => ({
    default: module.UnauthorizedPage,
  })),
);

const InProgressPage = lazy(() =>
  import("@/components/InProgressPage").then((module) => ({
    default: module.InProgressPage,
  })),
);

const NotFoundPage = lazy(() =>
  import("@/components/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  })),
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
          <Route
            element={
              <ProtectedRoute allowedRoles={getRolesForRoute("/commerces")} />
            }
          >
            <Route path="/commerces" element={<CommercesPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute allowedRoles={getRolesForRoute("/sell")} />
            }
          >
            <Route path="/sell" element={<SellPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute allowedRoles={getRolesForRoute("/cashiers")} />
            }
          >
            <Route path="/cashiers" element={<CashiersPage />} />
          </Route>
        </Route>
        {/* vistas full-screen, fuera de MainLayout */}
        <Route
          element={
            <ProtectedRoute allowedRoles={getRolesForRoute("/dashboard")} />
          }
        >
          <Route path="/dashboard" element={<InProgressPage />} />
        </Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/in-progress" element={<InProgressPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
