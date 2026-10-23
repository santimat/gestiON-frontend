import { CommerceItem } from "@/components/commerces/CommerceItem";
import type { CommerceWithOwner } from "@/types";

type CommerceListProps = {
  commercesWithOwner: CommerceWithOwner[];
};

export const CommerceList = ({ commercesWithOwner }: CommerceListProps) => {
  // en mobile sólo se ven logo, comercio (con dueño debajo), estado y acciones;
  // a partir de lg aparecen el resto de las columnas
  const columns =
    "grid grid-cols-[48px_minmax(0,1fr)_auto_auto] items-center gap-x-4 lg:grid-cols-[72px_1fr_1fr_1.4fr_120px_90px_90px]";

  const HEADERS = [
    { label: "Logo" },
    { label: "Comercio" },
    { label: "Dueño", className: "hidden lg:block" },
    { label: "Email", className: "hidden lg:block" },
    { label: "Modificación", className: "hidden lg:block" },
    { label: "Estado" },
    { label: "Acciones" },
  ];

  return (
    <section className="bg-background border-border rounded-lg border">
      <div>
        <div
          className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          {HEADERS.map(({ label, className }) => (
            <p key={label} className={className}>
              {label}
            </p>
          ))}
        </div>
        <ul className="[&>li]:not-first:border-border [&>li]:not-first:border-t">
          {commercesWithOwner.map((commerce) => {
            return (
              <CommerceItem
                key={`commerce-owner-${commerce.commerceId}`}
                commerce={commerce}
                columns={columns}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};
