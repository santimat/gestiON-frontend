import type { MouseEvent } from "react";
import { Badge, Switch } from "@mantine/core";

import type { CommerceWithOwnerDTO } from "@/types";

type CommerceListProps = {
  commercesWithOwner: CommerceWithOwnerDTO[];
};

export function CommerceList({ commercesWithOwner }: CommerceListProps) {
  const handleClick = async (event: MouseEvent<HTMLUListElement>) => {
    const clicked = event.target as HTMLElement;

    if (clicked.tagName == "INPUT") {
      // logica para actualizar estado del comercio
    }
  };

  return (
    <section className="bg-card col-span-3 p-4">
      <main className="grid grid-cols-6">
        <div className="border-border text-secondary-foreground col-span-6 grid grid-cols-6 border-b pb-2 text-sm">
          <p>Comercio</p>
          <p>Dueño</p>
          <p>Email</p>
          <p>Alta</p>
          <p>Estado</p>
          <p>Acciones</p>
        </div>
        <ul className="col-span-6 py-2" onClick={handleClick}>
          {commercesWithOwner.map((commerce) => {
            const createdAt = new Date(commerce.createdAt);
            const day = createdAt.getDay();
            const month = createdAt.getMonth();
            const year = createdAt.getFullYear();
            const badgeText = commerce.businessActive ? "Activo" : "Inactivo";
            const badgeColor = commerce.businessActive ? "green" : "red";

            return (
              <li
                key={`commerce-owner-${commerce.commerceId}`}
                className="grid grid-cols-6 items-center"
              >
                <p>{commerce.businessName}</p>
                <p>{commerce.username}</p>
                <p>{commerce.email}</p>
                <p>{`${day}/${month}/${year}`}</p>
                <Badge color={badgeColor}>{badgeText}</Badge>
                <Switch
                  data-commerce={commerce.commerceId}
                  checked={commerce.businessActive}
                />
              </li>
            );
          })}
        </ul>
      </main>
    </section>
  );
}
