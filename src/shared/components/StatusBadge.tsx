export type StatusTone = "success" | "warning" | "destructive" | "primary";

const TONE_CLASSES: Record<StatusTone, string> = {
  success: "bg-success/30 text-success",
  warning: "bg-warning/30 text-warning",
  destructive: "bg-destructive/30 text-destructive",
  primary: "bg-primary-soft text-primary",
};

type StatusBadgeProps = {
  label: string;
  tone: StatusTone;
  // xs = chip compacto dentro de items (text-xs), sm = badge de lista (default)
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
