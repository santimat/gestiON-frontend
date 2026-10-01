import { Button } from "@mantine/core";
import type { MouseEvent } from "react";
import { BuildingComplexIcon } from "lucide-react";

import { useCommerce } from "@/hooks/useCommerce";
import { CommerceItem } from "@/components/commerces/CommerceItem";

type CommerceListProps = {
  openModal: () => void;
};

export function CommerceList({ openModal }: CommerceListProps) {
  const { commercesWithOwner, handleToggleCommerceActive } = useCommerce();

  const columns =
    "grid grid-cols-[72px_1fr_1fr_1.4fr_120px_90px_90px] items-center gap-x-4";

  const handleClick = async (event: MouseEvent<HTMLUListElement>) => {
    const clicked = event.target as HTMLElement;
    if (clicked.tagName == "INPUT") {
      const commerceId = Number(clicked.closest("li")?.dataset.commerce);
      return await handleToggleCommerceActive(commerceId);
    }
  };

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
      <div>
        <div
          className={`border-border text-secondary-foreground ${columns} border-b p-2 text-sm`}
        >
          <p>Logo</p>
          <p>Comercio</p>
          <p>Dueño</p>
          <p>Email</p>
          <p>Modificación</p>
          <p>Estado</p>
          <p>Acciones</p>
        </div>
        <ul
          className="[&>li]:not-first:border-border [&>li]:not-first:border-t"
          onClick={handleClick}
        >
          {commercesWithOwner.length ? (
            commercesWithOwner.map((commerce) => {
              return (
                <CommerceItem
                  key={`commerce-owner-${commerce.commerceId}`}
                  commerce={commerce}
                  openModal={openModal}
                  columns={columns}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center gap-4">
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
