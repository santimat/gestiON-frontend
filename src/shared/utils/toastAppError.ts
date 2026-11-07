import { toast } from "sonner";

import type { AppError } from "@shared/types";

export const toastAppError = (error: unknown, fallback: string): void => {
  const appError = error as AppError;
  toast.error(appError?.message ?? fallback);
};
