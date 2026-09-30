import type { MouseEvent } from "react";
import { Button, Switch } from "@mantine/core";
import { BuildingComplexIcon, PenIcon } from "lucide-react";
import { useCommerce } from "@/hooks/useCommerce";

type CommerceListProps = {
  openModal: () => void;
};

export function CommerceList({ openModal }: CommerceListProps) {
  const { commercesWithOwner, handleToggleCommerceActive } = useCommerce();

  const handleClick = async (event: MouseEvent<HTMLUListElement>) => {
    const clicked = event.target as HTMLElement;

    if (clicked.tagName == "INPUT") {
      const commerceId = Number(clicked.dataset.commerce);
      await handleToggleCommerceActive(commerceId);
    }
  };

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
      <main className="grid grid-cols-6">
        <div className="border-border text-secondary-foreground col-span-6 grid grid-cols-6 border-b p-2 text-sm">
          <p>Comercio</p>
          <p>Dueño</p>
          <p>Email</p>
          <p>Alta</p>
          <p>Estado</p>
          <p>Acciones</p>
        </div>
        <ul
          className="[&>li]:not-first:border-border col-span-6 p-2 [&>li]:not-first:border-t"
          onClick={handleClick}
        >
          {commercesWithOwner.length ? (
            commercesWithOwner.map((commerce) => {
              const createdAt = new Date(commerce.createdAt);
              const day = createdAt.getDay();
              const month = createdAt.getMonth();
              const year = createdAt.getFullYear();
              const switchText = commerce.businessActive
                ? "Activo"
                : "Inactivo";

              return (
                <li
                  key={`commerce-owner-${commerce.commerceId}`}
                  className="grid grid-cols-6 items-center p-2"
                >
                  <p className="first-letter:uppercase">
                    {commerce.businessName}
                  </p>
                  <p className="first-letter:uppercase">{commerce.username}</p>
                  <p>{commerce.email}</p>
                  <p>{`${day}/${month}/${year}`}</p>
                  <Switch
                    data-commerce={commerce.commerceId}
                    label={switchText}
                    color="green"
                    checked={commerce.businessActive}
                  />
                  <div>
                    <Button size="compact-sm">
                      <PenIcon size={20} />
                    </Button>
                  </div>
                </li>
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
