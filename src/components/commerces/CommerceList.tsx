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

  const handleClick = async (event: MouseEvent<HTMLUListElement>) => {
    const clicked = event.target as HTMLElement;
    if (clicked.tagName == "INPUT") {
      const commerceId = Number(clicked.closest("li")?.dataset.commerce);
      return await handleToggleCommerceActive(commerceId);
    }
  };

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
      <main className="grid grid-cols-7">
        <div className="border-border text-secondary-foreground col-span-7 grid grid-cols-7 border-b p-2 text-sm">
          <p>Logo</p>
          <p>Comercio</p>
          <p>Dueño</p>
          <p>Email</p>
          <p>Modificación</p>
          <p>Estado</p>
          <p>Acciones</p>
        </div>
        <ul
          className="[&>li]:not-first:border-border col-span-7 p-2 [&>li]:not-first:border-t"
          onClick={handleClick}
        >
          {commercesWithOwner.length ? (
            commercesWithOwner.map((commerce) => {
              return (
                <CommerceItem
                  key={`commerce-owner-${commerce.commerceId}`}
                  commerce={commerce}
                  openModal={openModal}
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
      </main>
    </section>
  );
}
