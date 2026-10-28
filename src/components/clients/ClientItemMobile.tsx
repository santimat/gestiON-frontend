import type { Client } from "@/types";
import { useClient } from "@/hooks/useClient";
import { ProductItemActions } from "@/components/products/ProductItemActions";
import type { LucideIcon } from "lucide-react";

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

  return (
    <div className="border-border bg-card shadow-card rounded-xl border p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {client.name} {client.lastName}
          </p>
          <p className="text-secondary-foreground text-xs tabular-nums">
            DNI {client.dni} · {client.phoneNumber || "Sin teléfono"}
          </p>
          <p className="text-secondary-foreground truncate text-xs">
            {client.address || "Sin dirección"}
          </p>
        </div>
        <ProductItemActions
          actionsIcons={actionsIcons}
          onEdit={() => openEdit(client)}
        />
      </div>
    </div>
  );
};
