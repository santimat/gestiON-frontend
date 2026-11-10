import type { LucideIcon } from "lucide-react";

import { formatCurrency } from "@shared/utils/money";
import type { Client } from "@features/clients/types";
import { useClient } from "@features/clients/hooks/useClient";
import { ProductItemActions } from "@shared/components/ProductItemActions";
import { ClientStatusBadge } from "@features/clients/components/ClientStatusBadge";

type ClientItemMobileProps = {
  client: Client;
  actionsIcons: {
    Icon: LucideIcon;
    label: string;
  }[];
};

export const ClientItemMobile = ({
  client,
  actionsIcons,
}: ClientItemMobileProps) => {
  const { openEdit } = useClient();

  const totalSpent = formatCurrency(client.totalSpent ?? 0);

  return (
    <div className="border-background-soft bg-card shadow-card rounded-xl border p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-col gap-1">
            <p className="truncate text-sm font-semibold">
              {client.name} {client.lastName}
            </p>
            <p className="text-secondary-foreground text-xs tabular-nums">
              DNI {client.dni}
            </p>
            <p className="text-secondary-foreground text-xs tabular-nums">
              TEL {client.phoneNumber || "Sin teléfono"}
            </p>
            <p className="text-secondary-foreground truncate text-xs">
              {client.address || "Sin dirección"}
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-[14px]">
              {/*TODO: MOSTRAR MENSAJE DE AUN NO GASTÓ*/}
              {client.salesCount == 0
                ? "No hay pagos"
                : `${client.salesCount} ㆍ ${totalSpent}`}
            </p>
            <ClientStatusBadge
              totalPending={client.totalPending}
              client={client}
            />
          </div>
        </div>
        <ProductItemActions
          actionsIcons={actionsIcons}
          onEdit={() => openEdit(client)}
        />
      </div>
    </div>
  );
};
