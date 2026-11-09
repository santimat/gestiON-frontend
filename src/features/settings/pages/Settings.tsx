import { useState } from "react";

import { usePageHeader } from "@/shared/layout/hooks/usePageHeader";
import { useCommerce, type CurrentCommerce } from "@/features/commerces";
import { NameAndImageSection } from "@/features/settings/components/NameAndImageSection";
import { ProfitMultiplierSection } from "@features/settings/components/ProfitMultiplierSection";
import { Button } from "@mantine/core";

export const Settings = () => {
  const { currentCommerce } = useCommerce();

  const [commerceForm, setCommerceForm] = useState<CurrentCommerce | null>(
    null,
  );

  usePageHeader({
    title: "Configuración",
    subtitle: `Personaliza tu mercado.`,
  });

  if (commerceForm === null && currentCommerce) {
    setCommerceForm(currentCommerce);
  }

  if (!commerceForm) {
    return (
      <main className="mx-auto max-w-180 pt-6">
        <p>Cargando información del comercio...</p>
      </main>
    );
  }

  const handleSubmit = () => {};

  return (
    <main className="mx-auto max-w-200 px-4 py-6 md:px-2">
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <NameAndImageSection {...{ commerceForm, setCommerceForm }} />
        <ProfitMultiplierSection {...{ commerceForm, setCommerceForm }} />
        <Button>Guardar cambios</Button>
      </form>
    </main>
  );
};
