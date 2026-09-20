import { Routes, Route, Outlet } from "react-router";
import { AuthPage } from "@/pages/Auth";
import { MainLayout } from "@/layouts/MainLayout";
import "@/global.css";
import { Cashiers } from "@/pages/Cashiers";
import { Products } from "@/pages/Products";

function App() {
	return (
		<>
			<Routes>
				<Route index element={<AuthPage />} />
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
			</Routes>
		</>
	);
}

export default App;
