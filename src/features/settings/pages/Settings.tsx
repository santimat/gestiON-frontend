import { usePageHeader } from "@/shared/layout/hooks/usePageHeader";

export const Settings = () => {
  usePageHeader({
    title: "Configuración",
    subtitle: `Personaliza tu mercado.`,
  });

  return (
    <main className="p-6">
      <h1>Hola soy configuraciones</h1>
    </main>
  );
};
