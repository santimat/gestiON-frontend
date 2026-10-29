import type { PageHeaderContent } from "@/stores/pageHeader/types";

// Header de página inyectado de forma fija en MainLayout.
// Alineado con la sidebar: total 72px (py-3 + h1 28px + subtitle 20px),
// igual que el header del sidebar (p-4 + logo h-10) antes de su border-b.
export const PageHeader = ({ title, subtitle, actions }: PageHeaderContent) => (
  <header className="border-border flex h-18 items-center justify-between gap-2 border-b px-4 py-3">
    <div className="min-w-0">
      <h1 className="text-xl font-semibold">{title}</h1>
      {subtitle ? (
        <p className="text-secondary-foreground text-sm">{subtitle}</p>
      ) : null}{" "}
    </div>
    {actions}
  </header>
);
