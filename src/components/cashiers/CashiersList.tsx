import { CashierItem } from "@/components/cashiers/CashierItem";
import { CashierItemMobile } from "@/components/cashiers/CashierItemMobile";
import { useCashier } from "@/hooks/useCashier";

export const CashiersList = () => {
  const { cashiers } = useCashier();

  const headers = ["Cajero", "Email", "Alta", "Estado", "Acceso"];

  const columns =
    "grid grid-cols-[1fr_1fr_0.6fr_0.5fr_0.3fr] items-center gap-x-4";

  return (
    <>
      {/* Escritorio */}
      <section className="bg-background border-border hidden rounded-lg border md:block">
        <ul
          className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          {headers.map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>
        <ul className="[&>li]:not-first:border-border [&>li]:not-first:border-t">
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

      {/* Mobile */}
      <div className="grid gap-3 md:hidden">
        {cashiers.map((cashier) => (
          <CashierItemMobile
            key={`cashier-mobile-${cashier.id}`}
            cashier={cashier}
          />
        ))}
      </div>
    </>
  );
};
