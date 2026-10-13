import { BuildingComplexIcon } from "lucide-react";

import type { CommerceWithOwner } from "@/types";
import { useCommerce } from "@/hooks/useCommerce";
import { LoadingPage } from "@/components/Loading";
import { CommerceItem } from "@/components/commerces/CommerceItem";

type CommerceListProps = {
  onEdit: (commerce: CommerceWithOwner) => void;
};

export function CommerceList({ onEdit }: CommerceListProps) {
  const { commercesWithOwner, isLoading, error } = useCommerce();

  const columns =
    "grid grid-cols-[72px_1fr_1fr_1.4fr_120px_90px_90px] items-center gap-x-4";

  const HEADERS = [
    "Logo",
    "Comercio",
    "Dueño",
    "Email",
    "Modificación",
    "Estado",
    "Acciones",
  ];

  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (isLoading) return <LoadingPage />;

  if (commercesWithOwner.length === 0) {
    return (
      <div className="border-border text-secondary-foreground flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border p-10">
        <BuildingComplexIcon size={40} strokeWidth={1.5} />
        <p className="text-foreground font-medium">
          No hay comercios para mostrar
        </p>
        <p className="text-sm">Agregá uno nuevo para empezar.</p>
      </div>
    );
  }

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
      <div>
        <div
          className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          {HEADERS.map((header) => (
            <p key={header}>{header}</p>
          ))}
        </div>
        <ul className="[&>li]:not-first:border-border [&>li]:not-first:border-t">
          {commercesWithOwner.map((commerce) => {
            return (
              <CommerceItem
                key={`commerce-owner-${commerce.commerceId}`}
                commerce={commerce}
                onEdit={onEdit}
                columns={columns}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
