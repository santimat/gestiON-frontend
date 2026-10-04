import { Toaster } from "sonner";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";

import "@/global.css";
import App from "@/App.tsx";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <MantineProvider>
      <App />
      <Toaster visibleToasts={1} richColors position="top-right" />
    </MantineProvider>
  </BrowserRouter>,
);
