import { lazy } from "react";
import { Routes, Route, Outlet } from "react-router";

import "@/global.css";
import { GuestRoute } from "@shared/routes/GuestRoute";
import { MainLayout } from "@shared/layout/MainLayout";
import { ProtectedRoute } from "@shared/routes/ProtectedRoute";
import { getRolesForRoute } from "@shared/config/permissions";

const LandingPage = lazy(() =>
  import("@features/landing/pages/Landing").then((module) => ({
    default: module.LandingPage,
  })),
);

const AuthPage = lazy(() =>
  import("@features/auth/pages/Auth").then((module) => ({
    default: module.AuthPage,
  })),
);

const CashiersPage = lazy(() =>
  import("@features/cashiers/pages/Cashiers").then((module) => ({
    default: module.Cashiers,
  })),
);

const ProductsPage = lazy(() =>
  import("@features/products/pages/Products").then((module) => ({
    default: module.Products,
  })),
);

const CommercesPage = lazy(() =>
  import("@features/commerces/pages/Commerces").then((module) => ({
    default: module.Commerces,
  })),
);

const SellPage = lazy(() =>
  import("@features/sales/pages/Sell").then((module) => ({
    default: module.Sell,
  })),
);

const SalesPage = lazy(() =>
  import("@features/sales/pages/Sales").then((module) => ({
    default: module.Sales,
  })),
);

const ClientsPage = lazy(() =>
  import("@features/clients/pages/Clients").then((module) => ({
    default: module.Clients,
  })),
);

const CategoriesPage = lazy(() =>
  import("@features/categories/pages/Categories").then((module) => ({
    default: module.Categories,
  })),
);

const SellPointsPage = lazy(() =>
  import("@features/sell-points/pages/SellPoints").then((module) => ({
    default: module.SellPoints,
  })),
);

const OffersPage = lazy(() =>
  import("@features/offers/pages/Offers").then((module) => ({
    default: module.Offers,
  })),
);

const UnauthorizedPage = lazy(() =>
  import("@shared/pages/UnauthorizedPage").then((module) => ({
    default: module.UnauthorizedPage,
  })),
);

const NotFoundPage = lazy(() =>
  import("@shared/pages/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  })),
);

const SettingsPage = lazy(() =>
  import("@features/settings/pages/Settings").then((module) => ({
    default: module.Settings,
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
            <Route path="/sales" element={<SalesPage />} />
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
          <Route
            element={
              <ProtectedRoute allowedRoles={getRolesForRoute("/categories")} />
            }
          >
            <Route path="/categories" element={<CategoriesPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute allowedRoles={getRolesForRoute("/offers")} />
            }
          >
            <Route path="/offers" element={<OffersPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute allowedRoles={getRolesForRoute("/sell-point")} />
            }
          >
            <Route path="/sell-point" element={<SellPointsPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute allowedRoles={getRolesForRoute("/dashboard")} />
            }
          >
            <Route path="/dashboard" element={<p> Dashboard </p>} />
          </Route>
          <Route
            element={
              <ProtectedRoute allowedRoles={getRolesForRoute("/settings")} />
            }
          >
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* vistas full-screen, fuera de MainLayout */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
