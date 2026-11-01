import { Check, type LucideIcon } from "lucide-react";

type RoleCardProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  items: string[];
};

export const RoleCard = ({
  icon: Icon,
  title,
  subtitle,
  items,
}: RoleCardProps) => {
  return (
    <div className="bg-card shadow-card border-border rounded-xl border p-6">
      <div className="flex items-center gap-3">
        <span className="bg-primary-soft text-primary grid h-10 w-10 place-items-center rounded-lg">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <p className="text-secondary-foreground text-sm">{subtitle}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-secondary-foreground flex items-start gap-2.5 text-sm"
          >
            <Check
              className="text-success mt-1 h-4 w-4 shrink-0"
              strokeWidth={2}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
