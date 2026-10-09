import { Button } from "@mantine/core";
import { BuildingComplexIcon } from "lucide-react";

import type { CommerceWithOwner } from "@/types";
import { useCommerce } from "@/hooks/useCommerce";
import { LoadingPage } from "@/components/Loading";
import { CommerceItem } from "@/components/commerces/CommerceItem";

type CommerceListProps = {
  openModal: () => void;
  onEdit: (commerce: CommerceWithOwner) => void;
};

export function CommerceList({ openModal, onEdit }: CommerceListProps) {
  const { commercesWithOwner, isLoading } = useCommerce();

  const columns =
    "grid grid-cols-[72px_1fr_1fr_1.4fr_120px_90px_90px] items-center gap-x-4";

  const headers = [
    "Logo",
    "Comercio",
    "Dueño",
    "Email",
    "Modificación",
    "Estado",
    "Acciones",
  ];

  if (isLoading) return <LoadingPage />;

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
      <div>
        <div
          className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          {headers.map((header) => (
            <p key={header}>{header}</p>
          ))}
        </div>
        <ul className="[&>li]:not-first:border-border [&>li]:not-first:border-t">
          {commercesWithOwner.length ? (
            commercesWithOwner.map((commerce) => {
              return (
                <CommerceItem
                  key={`commerce-owner-${commerce.commerceId}`}
                  commerce={commerce}
                  onEdit={onEdit}
                  columns={columns}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center gap-4 p-2">
              <p>Todavía no hay comercios añadidos. Añade el primero.</p>
              <Button onClick={openModal} leftSection={<BuildingComplexIcon />}>
                Agregar comercio
              </Button>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
}
