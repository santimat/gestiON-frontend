import { Pencil } from "lucide-react";

import { ClientItem } from "@/components/clients/ClientItem";
import { ClientItemMobile } from "@/components/clients/ClientItemMobile";
import { useClient } from "@/hooks/useClient";

export const ClientList = () => {
  const { clients } = useClient();

  const headers = ["Cliente", "DNI", "Telefono", "Direccion", "Acciones"];

  const actionsIcons = [{ Icon: Pencil, label: "Editar" }];

  const columns =
    "grid grid-cols-[1fr_0.5fr_0.7fr_1fr_0.2fr] items-center gap-x-4";

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
        <ul>
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

      {/* Mobile */}
      <div className="grid gap-3 md:hidden">
        {clients.map((client) => (
          <ClientItemMobile
            key={`client-mobile-${client.id}`}
            client={client}
            actionsIcons={actionsIcons}
          />
        ))}
      </div>
    </>
  );
};
