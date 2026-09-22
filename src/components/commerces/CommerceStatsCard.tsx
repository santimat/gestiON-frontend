import { type LucideIcon } from "lucide-react";

type CommerceStatsCardProps = {
  section: string;
  quantity: number;
  description: string;
  icon: {
    iconName: LucideIcon;
    iconClasses: string;
  };
};

export function CommerceStatsCard({
  section,
  quantity,
  description,
  icon: { iconName: Icon, iconClasses },
}: CommerceStatsCardProps) {
  return (
    <article className="border-border flex h-30 flex-col justify-between rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <p className="text-secondary-foreground font-semibold">{section}</p>
        <Icon className={`h-auto w-7 rounded-lg p-1 ${iconClasses}`} />
      </div>
      <div>
        <p className="text-3xl font-semibold">{quantity}</p>
        <p className="text-secondary-foreground text-sm">{description}</p>
      </div>
    </article>
  );
}
