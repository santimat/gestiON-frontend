import { Pencil } from "lucide-react";

import { ClientItem } from "@features/clients/components/ClientItem";
import { ClientItemMobile } from "@features/clients/components/ClientItemMobile";
import { useClient } from "@features/clients/hooks/useClient";
import { useIsMobile } from "@shared/hooks/useMediaQuery";

export const ClientList = () => {
  const { clients } = useClient();
  const isMobile = useIsMobile();

  const headers = ["Cliente", "DNI", "Telefono", "Direccion", "Acciones"];

  const actionsIcons = [{ Icon: Pencil, label: "Editar" }];

  const columns =
    "grid grid-cols-[1fr_0.5fr_0.7fr_1fr_0.2fr] items-center gap-x-4";

  if (isMobile) {
    return (
      <div className="grid gap-3">
        {clients.map((client) => (
          <ClientItemMobile
            key={`client-mobile-${client.id}`}
            client={client}
            actionsIcons={actionsIcons}
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
          {clients.map((client) => {
            return (
              <ClientItem
                key={`client-${client.id}`}
                client={client}
                columns={columns}
                actionsIcons={actionsIcons}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};
