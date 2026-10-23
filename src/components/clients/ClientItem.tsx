import type { LucideIcon } from "lucide-react";

import type { Client } from "@/types";
import { useClient } from "@/hooks/useClient";
import { ProductItemActions } from "@/components/products/ProductItemActions";

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
      <ProductItemActions
        actionsIcons={actionsIcons}
        onEdit={() => openEdit(client)}
      />
    </li>
  );
};
