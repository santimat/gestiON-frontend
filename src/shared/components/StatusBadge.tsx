import type { StatusTone } from "@shared/types";

const TONE_CLASSES: Record<StatusTone, string> = {
  warning: "bg-warning/30 text-warning",
  success: "bg-success/30 text-success",
  primary: "bg-primary-soft text-primary",
  destructive: "bg-destructive/30 text-destructive",
};

type StatusBadgeProps = {
  label: string;
  tone: StatusTone;
  size?: "xs" | "sm";
};

// badge reutilizable para mostrar el estado de un item (ej: vendido, pendiente, stock, oferta, etc.)
export const StatusBadge = ({ label, tone, size = "sm" }: StatusBadgeProps) => (
  <span
    className={`${TONE_CLASSES[tone]} ${size === "xs" ? "py-0.5 text-xs font-medium" : "text-sm"} w-fit rounded-full px-2`}
  >
    {label}
  </span>
);
