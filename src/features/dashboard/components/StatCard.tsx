import { type LucideIcon } from "lucide-react";

type StatCardTone = "default" | "success" | "warning";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: StatCardTone;
  className?: string;
};

const TONE_CLASSES: Record<StatCardTone, string> = {
  default: "bg-primary/40 text-primary",
  success: "bg-success/40 text-success",
  warning: "bg-warning/40 text-warning",
};

export const StatCard = ({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
  className,
}: StatCardProps) => (
  <article
    className={`${"bg-card shadow-card border-background-soft rounded-xl border p-4"} ${
      className ?? ""
    }`}
  >
    <div className="flex items-center justify-between gap-3">
      <p className="text-secondary-foreground font-medium">{label}</p>
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${TONE_CLASSES[tone]}`}
      >
        <Icon className="h-4 w-4" />
      </span>
    </div>
    <p className="text-xl font-semibold tabular-nums md:text-3xl">{value}</p>
    {hint ? (
      <p className="text-secondary-foreground mt-1 text-xs">{hint}</p>
    ) : null}
  </article>
);
