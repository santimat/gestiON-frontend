import { useState } from "react";
import { toast } from "sonner";

import type { AppError } from "@shared/types";

export const useToggleActive = (successMessage: string | null) => {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async (toggleFn: () => Promise<unknown>) => {
    setIsToggling(true);
    try {
      await toggleFn();
      if (successMessage) toast.success(successMessage);
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo cambiar el estado.");
    } finally {
      setIsToggling(false);
    }
  };

  return { isToggling, handleToggle };
};
