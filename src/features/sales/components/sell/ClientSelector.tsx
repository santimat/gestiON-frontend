import { Select } from "@mantine/core";
import type { Client } from "@features/clients/types";
import type { SetSaleDraft } from "@features/sales";
import { useClient } from "@features/clients";

type ClientSelectorProps = {
  clients: Client[];
  clientId: number | null;
  onChange: SetSaleDraft;
};

export const ClientSelector = ({
  clients,
  clientId,
  onChange,
}: ClientSelectorProps) => {
  const { openCreate } = useClient();

  return (
    <div className="relative mt-4 flex items-center space-y-2">
      <button
        onClick={openCreate}
        className="text-primary absolute top-1 right-0 text-sm! hover:cursor-pointer hover:underline"
      >
        Crear cliente
      </button>
      <div className="w-full">
        <Select
          label="Cliente (opcional)"
          placeholder="Consumidor final"
          data={clients.map((client) => ({
            value: String(client.id),
            label: `${client.lastName}, ${client.name} — DNI ${client.dni}`,
          }))}
          value={clientId !== null ? String(clientId) : null}
          onChange={(value) =>
            onChange({ clientId: value ? Number(value) : null })
          }
          allowDeselect
        />
        <p className="text-secondary-foreground text-xs">
          Asociá la venta a un cliente para su cuenta corriente.
        </p>
      </div>
    </div>
  );
};
