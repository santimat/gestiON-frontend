import { CashierItem } from "@features/cashiers/components/CashierItem";
import { CashierItemMobile } from "@features/cashiers/components/CashierItemMobile";
import { useCashier } from "@features/cashiers/hooks/useCashier";
import { useIsMobile } from "@shared/hooks/useMediaQuery";

export const CashiersList = () => {
  const { cashiers } = useCashier();
  const isMobile = useIsMobile();

  const headers = ["Cajero", "Email", "Actualizado", "Estado", "Acceso"];

  const columns =
    "grid grid-cols-[1fr_1fr_0.6fr_0.5fr_0.3fr] items-center gap-x-4";

  if (isMobile) {
    return (
      <div className="grid gap-3">
        {cashiers.map((cashier) => (
          <CashierItemMobile
            key={`cashier-mobile-${cashier.id}`}
            cashier={cashier}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <section className="bg-card border-background-soft rounded-lg border">
        <ul
          className={`border-background-soft text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          {headers.map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>
        <ul className="[&>li]:not-first:border-background-soft text-sm [&>li]:not-first:border-t">
          {cashiers.map((cashier) => {
            return (
              <CashierItem
                key={`cashier-${cashier.id}`}
                cashier={cashier}
                columns={columns}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};
