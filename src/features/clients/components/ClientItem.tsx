import type { LucideIcon } from "lucide-react";

import { formatCurrency } from "@shared/utils/money";
import type { Client } from "@features/clients/types";
import { useClient } from "@features/clients/hooks/useClient";
import { ProductItemActions } from "@shared/components/ProductItemActions";
import { ClientStatusBadge } from "@features/clients/components/ClientStatusBadge";

type ClientItemProps = {
  client: Client;
  actionsIcons: {
    Icon: LucideIcon;
    label: string;
  }[];
  columns: string;
};

export const ClientItem = ({
  client,
  actionsIcons,
  columns,
}: ClientItemProps) => {
  const { openEdit } = useClient();

  const totalSpent = formatCurrency(client.totalSpent ?? 0);

  return (
    <li className={`p-2 ${columns}`}>
      <div>
        <p>
          {client.name} {client.lastName}
        </p>
      </div>
      <p className="tabular-nums">{client.dni}</p>
      <p className="tabular-nums">{client.phoneNumber || "----"}</p>
      <p className="line-clamp-1">{client.address || "----"}</p>
      <p className="font-semibold tabular-nums">
        {client.salesCount || "----"} ㆍ {totalSpent || "----"}
      </p>
      <ClientStatusBadge
        totalPending={client.totalPending}
        client={client}
      />
      <ProductItemActions
        actionsIcons={actionsIcons}
        onEdit={() => openEdit(client)}
      />
    </li>
  );
};
