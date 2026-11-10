import type { LucideIcon } from "lucide-react";

type SettingsFormSectionProps = {
  icon: LucideIcon;
  title: string;
  mainClasses: string;
  children?: React.ReactNode;
};

export const SettingsFormSection = ({
  icon: Icon,
  title,
  mainClasses,
  children,
}: SettingsFormSectionProps) => {
  return (
    <section className="border-background-soft shadow-card rounded-xl border p-4 md:p-2">
      <header className="flex items-center gap-2 p-2">
        <Icon size={24} className="text-primary" />
        <p className="font-semibold">{title}</p>
      </header>
      <main className={mainClasses}>{children}</main>
    </section>
  );
};
