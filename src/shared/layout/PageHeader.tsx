import type { PageHeaderContent } from "@shared/layout/stores/pageHeader/types";

export const PageHeader = ({ title, subtitle, actions }: PageHeaderContent) => (
  <header className="border-border h-18 border-b px-4 py-3">
    <div className="flex items-center justify-between gap-2 md:mx-auto md:w-[80%]">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {subtitle ? (
          <p className="text-secondary-foreground truncate text-sm">
            {subtitle}
          </p>
        ) : null}{" "}
      </div>
      {actions}
    </div>
  </header>
);
