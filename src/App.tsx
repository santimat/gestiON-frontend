import { lazy } from "react";
import { Routes, Route, Outlet } from "react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { AuthPage } from "@/pages/Auth";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import "@/global.css";

const Cashiers = lazy(() =>
	import("@/pages/Cashiers").then((module) => ({ default: module.Cashiers })),
);

const Products = lazy(() =>
	import("@/pages/Products").then((module) => ({ default: module.Products })),
);

function App() {
	return (
		<>
			<Routes>
				<Route index element={<AuthPage />} />
				{/* protected route funcionará como un middleware para interceptar el jwt y verificar que sea un usuario logeado */}
				<Route
					element={
						<ProtectedRoute allowedRoles={["SUDO", "OWNER", "CASHIER"]} />
					}
				>
					<Route
						// se renderiza el mismo layout para todas las rutas dentro
						element={
							<MainLayout>
								<Outlet />
							</MainLayout>
						}
					>
						<Route path="/dashboard" element={<p>hola</p>} />
						<Route path="/cashiers" element={<Cashiers />} />
						<Route path="/products" element={<Products />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
