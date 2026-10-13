import { Contact, Pencil } from "lucide-react";

import { ClientItem } from "@/components/clients/ClientItem";
import type { Client } from "@/types";
import { useClient } from "@/hooks/useClient";
import { LoadingPage } from "../Loading";

type ClientListProps = {
  onEdit: (client: Client) => void;
};

export const ClientList = ({ onEdit }: ClientListProps) => {
  const { clients, isLoading } = useClient();

  const headers = ["Cliente", "DNI", "Telefono", "Direccion", "Acciones"];

  const actionsIcons = [{ Icon: Pencil, label: "Editar" }];

  const columns =
    "grid grid-cols-[1fr_0.5fr_0.7fr_1fr_0.2fr] items-center gap-x-4";

  if (isLoading) {
    return <LoadingPage />;
  }

  if (clients.length === 0) {
    return (
      <div className="border-border text-secondary-foreground flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border p-10">
        <Contact size={40} strokeWidth={1.5} />
        <p className="text-foreground font-medium">
          No hay clientes para mostrar
        </p>
        <p className="text-sm">Creá uno nuevo para empezar su cuenta.</p>
      </div>
    );
  }

  return (
    <section className="bg-background border-border col-span-3 rounded-lg border">
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
              onEdit={() => onEdit(client)}
            />
          );
        })}
      </ul>
    </section>
  );
};
