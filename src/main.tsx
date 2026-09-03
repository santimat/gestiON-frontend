import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "@/App.tsx";
import "@/global.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<MantineProvider>
			<App />
		</MantineProvider>
	</BrowserRouter>,
);
