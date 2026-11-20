import { useNavigate } from "react-router";
import type { Client } from "@features/clients/types";

type ClientStatusBadgeProps = {
  totalPending: number | null;
  client: Client;
};

export const ClientStatusBadge = ({ totalPending, client }: ClientStatusBadgeProps) => {
  const navigate = useNavigate();

  const owes = totalPending != null && totalPending > 0;

  const statusLabel = owes ? "Tiene deuda" : "Al día";
  const bg = owes
    ? "bg-warning/30 text-warning underline hover:cursor-pointer hover:underline-offset-2"
    : "bg-success/30 text-success";

  if (owes) {
    const searchText = `${client.name} ${client.lastName}`.replace(/\s+/g, "+");
    return (
      <button
        type="button"
        className={`${bg} w-fit rounded-full px-2 whitespace-nowrap`}
        onClick={() => navigate(`/sales?searchText=${searchText}&status=PENDING`)}
      >
        {statusLabel}
      </button>
    );
  }

  return <span className={`${bg} w-fit rounded-full px-2`}>{statusLabel}</span>;
};