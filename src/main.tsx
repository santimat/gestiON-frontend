import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import App from "@/App.tsx";
import "@/global.css";
import "@mantine/core/styles.css";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<MantineProvider>
			<App />
			<Toaster visibleToasts={1} richColors position="top-right" />
		</MantineProvider>
	</BrowserRouter>,
);
