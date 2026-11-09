import { usePageHeader } from "@/shared/layout/hooks/usePageHeader";
import { StoreIcon } from "lucide-react";

export const Settings = () => {
  usePageHeader({
    title: "Configuración",
    subtitle: `Personaliza tu mercado.`,
  });

  return (
    <main className="p-12">
      <section>
        <header className="flex gap-2">
          <StoreIcon size={24} />
          Comercio
        </header>
      </section>
    </main>
  );
};
