import type { Client } from "@features/clients/types";
import { usePendingSales } from "@features/sales";

type ClientStatusBadgeProps = {
  totalPending: number | null;
  client: Client;
};

export const ClientStatusBadge = ({ totalPending, client }: ClientStatusBadgeProps) => {
  const { setPendingSalesClient } = usePendingSales();

  const owes = totalPending != null && totalPending > 0;

  const statusLabel = owes ? "Tiene deuda" : "Al día";
  const bg = owes
    ? "bg-warning/30 text-warning underline hover:cursor-pointer hover:underline-offset-2"
    : "bg-success/30 text-success";

  if (owes)
    return (
      <button
        type="button"
        className={`${bg} w-fit rounded-full px-2 whitespace-nowrap`}
        onClick={() => setPendingSalesClient(client)}
      >
        {statusLabel}
      </button>
    );

  return <span className={`${bg} w-fit rounded-full px-2`}>{statusLabel}</span>;
};