import type { PageHeaderContent } from "@shared/layout/stores/pageHeader/types";

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
