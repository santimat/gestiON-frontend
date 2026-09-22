import { lazy } from "react";
import { Routes, Route, Outlet } from "react-router";

import "@/global.css";
import { AuthPage } from "@/pages/Auth";
import { GuestRoute } from "@/routes/GuestRoute";
import { MainLayout } from "@/layouts/MainLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

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

function App() {
	return (
		<>
			<Routes>
				<Route element={<GuestRoute />}>
					<Route index element={<AuthPage />} />
				</Route>
				{/* protected route funcionará como un middleware para interceptar el jwt y verificar que sea un usuario logeado */}
				<Route
					// se renderiza el mismo layout para todas las rutas dentro
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
						<Route path="/dashboard" element={<p>hola</p>} />
						<Route path="/products" element={<ProductsPage />} />
						<Route path="/cashiers" element={<CashiersPage />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
