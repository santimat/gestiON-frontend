import { Fragment, Suspense, type ReactNode } from "react";

import { useIsMobile } from "@shared/hooks/useMediaQuery";

type ListHeader = string | { label: string; className?: string };

type EntityListShellProps<T> = {
  items: T[];
  getKey: (item: T) => string | number;
  headers: ListHeader[];
  // clases del grid de escritorio
  columns: string;
  renderDesktop: (item: T) => ReactNode;
  // sin renderMobile la lista queda solo de escritorio
  renderMobile?: (item: T) => ReactNode;
  // los items mobile suelen ser <div> pero SaleItemMobile renderiza <li>
  mobileContainer?: "div" | "ul";
};

// layout compartido para las listas que tienen versión mobile y desktop (ej: ventas, productos, ofertas)
export const EntityListShell = <T,>({
  items,
  getKey,
  headers,
  columns,
  renderDesktop,
  renderMobile,
  mobileContainer = "div",
}: EntityListShellProps<T>) => {
  const isMobile = useIsMobile();

  if (isMobile && renderMobile) {
    const rows = items.map((item) => (
      <Fragment key={getKey(item)}>
        <Suspense fallback={null}>{renderMobile(item)}</Suspense>
      </Fragment>
    ));

    if (mobileContainer === "ul") {
      return <ul className="grid gap-3">{rows}</ul>;
    }

    return <div className="grid gap-3">{rows}</div>;
  }

  return (
    <section className="bg-card border-background-soft overflow-hidden rounded-lg border">
      <ul
        className={`border-background-soft bg-background-soft text-secondary-foreground ${columns} border-b p-2 text-sm`}
      >
        {headers.map((header) =>
          typeof header === "string" ? (
            <li key={header}>{header}</li>
          ) : (
            <li key={header.label} className={header.className}>
              {header.label}
            </li>
          ),
        )}
      </ul>
      <ul className="[&>li]:not-first:border-background-soft text-sm [&>li]:not-first:border-t">
        {items.map((item) => (
          <Fragment key={getKey(item)}>
            <Suspense fallback={null}>{renderDesktop(item)}</Suspense>
          </Fragment>
        ))}
      </ul>
    </section>
  );
};
