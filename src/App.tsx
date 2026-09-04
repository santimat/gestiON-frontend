import { Routes, Route } from "react-router";
import { AuthPage } from "@/pages/Auth";
import { HomePage } from "@/pages/Home";

function App() {
	return (
		<Routes>
			<Route index element={<AuthPage />} />
			<Route path="/dashboard" element={<HomePage />} />
		</Routes>
	);
}

export default App;
