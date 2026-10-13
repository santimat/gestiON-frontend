import type { LucideIcon } from "lucide-react";

import type { Client } from "@/types";
import { ProductItemActions } from "@/components/products/ProductItemActions";

type ClientItemProps = {
  client: Client;
  actionsIcons: {
    Icon: LucideIcon;
    label: string;
  }[];
  columns: string;
  onEdit: () => void;
};

export const ClientItem = ({
  client,
  actionsIcons,
  columns,
  onEdit,
}: ClientItemProps) => {
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
      <ProductItemActions actionsIcons={actionsIcons} onEdit={onEdit} />
    </li>
  );
};
