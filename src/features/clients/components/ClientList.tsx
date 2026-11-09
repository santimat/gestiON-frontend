import { lazy } from "react";
import { Pencil } from "lucide-react";

import { useClient } from "@features/clients/hooks/useClient";
import { EntityListShell } from "@shared/components/EntityListShell";

const ClientItem = lazy(() =>
  import("@features/clients/components/ClientItem").then((module) => ({
    default: module.ClientItem,
  })),
);

const ClientItemMobile = lazy(() =>
  import("@features/clients/components/ClientItemMobile").then((module) => ({
    default: module.ClientItemMobile,
  })),
);

const HEADERS = [
  "Cliente",
  "DNI",
  "Telefono",
  "Direccion",
  "Compras",
  "Estado",
  "Acciones",
];

const COLUMNS =
  "grid grid-cols-[0.5fr_0.5fr_0.7fr_0.5fr_0.5fr_0.3fr_0.2fr] items-center gap-x-4";

const ACTIONS_ICONS = [{ Icon: Pencil, label: "Editar" }];

export const ClientList = () => {
  const { clients } = useClient();

  return (
    <EntityListShell
      items={clients}
      getKey={(client) => client.id}
      headers={HEADERS}
      columns={COLUMNS}
      renderMobile={(client) => (
        <ClientItemMobile client={client} actionsIcons={ACTIONS_ICONS} />
      )}
      renderDesktop={(client) => (
        <ClientItem
          client={client}
          columns={COLUMNS}
          actionsIcons={ACTIONS_ICONS}
        />
      )}
    />
  );
};
