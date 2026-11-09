import type { z } from "zod";
import type { LucideIcon } from "lucide-react";

import type { ErrorDictionary } from "@shared/utils/errorDictionary";

export type NavItem = {
  text: string;
  // etiqueta corta para la barra de navegación inferior en mobile
  short: string;
  href: string;
  icon: LucideIcon;
};

export type UserRole = "OWNER" | "CASHIER" | "SUDO";

export type ZodParseResult<T = unknown> = z.ZodSafeParseResult<T>;

export type AppError = {
  code: keyof typeof ErrorDictionary;
  message: string;
  fieldErrors?: FieldErrors;
};

export type FieldErrors = Record<string, string | undefined>;

export type StatusTone = "success" | "warning" | "destructive" | "primary";
