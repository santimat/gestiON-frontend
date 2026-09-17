import { Routes, Route } from "react-router";
import { AuthPage } from "@/pages/Auth";
import { HomePage } from "@/pages/Home";
import "@/global.css";
import { Cashiers } from "@/pages/Cashiers";

function App() {
	return (
		<Routes>
			<Route index element={<AuthPage />} />
			<Route path="/dashboard" element={<HomePage><p>hola</p></HomePage>} />
			<Route path="/cashiers" element= {<HomePage><Cashiers/></HomePage>}/>

		</Routes>
	);
}

export default App;


	