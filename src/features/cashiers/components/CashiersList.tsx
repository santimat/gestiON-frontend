import { lazy } from "react";

import { useCashier } from "@features/cashiers/hooks/useCashier";
import { EntityListShell } from "@shared/components/EntityListShell";

const CashierItem = lazy(() =>
  import("@features/cashiers/components/CashierItem").then((module) => ({
    default: module.CashierItem,
  })),
);

const CashierItemMobile = lazy(() =>
  import("@features/cashiers/components/CashierItemMobile").then((module) => ({
    default: module.CashierItemMobile,
  })),
);

const HEADERS = ["Cajero", "Email", "Actualizado", "Estado", "Acceso"];

const COLUMNS =
  "grid grid-cols-[1fr_1fr_0.6fr_0.5fr_0.3fr] items-center gap-x-4";

export const CashiersList = () => {
  const { cashiers } = useCashier();

  return (
    <EntityListShell
      items={cashiers}
      getKey={(cashier) => cashier.id}
      headers={HEADERS}
      columns={COLUMNS}
      renderMobile={(cashier) => <CashierItemMobile cashier={cashier} />}
      renderDesktop={(cashier) => (
        <CashierItem cashier={cashier} columns={COLUMNS} />
      )}
    />
  );
};
