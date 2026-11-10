import { toast } from "sonner";
import { Button } from "@mantine/core";
import { useState, type SubmitEvent } from "react";

import type { AppError, FieldErrors } from "@/shared/types";
import { toastAppError } from "@/shared/utils/toastAppError";
import { usePageHeader } from "@/shared/layout/hooks/usePageHeader";
import { useCommerce, type CurrentCommerce } from "@/features/commerces";
import { NameAndImageSection } from "@/features/settings/components/NameAndImageSection";
import { ProfitMultiplierSection } from "@features/settings/components/ProfitMultiplierSection";

export const Settings = () => {
  const { currentCommerce, patchCommerce } = useCommerce();

  const [errors, setErrors] = useState<FieldErrors>({});

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

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", commerceForm.name);
    formData.append("profitMultiplier", String(commerceForm.profitMultiplier));
    if (commerceForm.businessImage) {
      formData.append("image", commerceForm.businessImage);
    }

    try {
      await patchCommerce(formData);
      toast.success("Información del comercio actualizada correctamente");
    } catch (error) {
      const appError = error as AppError;
      if (appError?.fieldErrors) return setErrors(appError.fieldErrors);
      toastAppError(error, "Error al actualizar la información del comercio");
    }
  };

  return (
    <main className="md:px-2">
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <NameAndImageSection {...{ commerceForm, setCommerceForm, errors }} />
        <ProfitMultiplierSection
          {...{ commerceForm, setCommerceForm, errors }}
        />
        <Button type="submit">Guardar cambios</Button>
      </form>
    </main>
  );
};
