import { Routes, Route } from "react-router";
import { AuthPage } from "@/pages/Auth";
import { HomePage } from "@/pages/Home";
import "@/global.css";
import { Cashiers } from "@/pages/Cashiers";
function App() {
	return (
		<Routes>
			<Route index element={<AuthPage />} />
			<Route path="/dashboard" element={<HomePage />} />
			<Route path="/cashiers" element={<Cashiers/>} />
		</Routes>
	);
}

export default App;
