import { Routes, Route } from "react-router";
import { AuthPage } from "@/pages/Auth";

function App() {
	return (
		<Routes>
			<Route path="/auth" element={<AuthPage />} />
		</Routes>
	);
}

export default App;
