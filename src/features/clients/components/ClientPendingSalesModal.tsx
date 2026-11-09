import { toast } from "sonner";
import { UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Loader, Modal, NumberFormatter } from "@mantine/core";

import { useSales } from "@features/sales";
import { usePendingSales } from "@features/sales";
import type { Sale } from "@features/sales/types";
import type { Client } from "@features/clients/types";
import { toastAppError } from "@shared/utils/toastAppError";
import { ModalHeader } from "@/shared/components/ModalHeader";
import { PAYMENT_METHODS_LABELS } from "@features/sales/dictionary";
import { useClientStore } from "@features/clients/stores/useClientStore";
import { usePendingSalesStore } from "@features/sales/stores/usePendingSalesStore";

type ClientPendingSalesModalProps = {
  opened: boolean;
  client: Client | null;
  onClose: () => void;
};

export const ClientPendingSalesModal = ({
  opened,
  client,
  onClose,
}: ClientPendingSalesModalProps) => {
  const {
    pendingSales,
    pendingSalesCount,
    totalPending,
    isLoading,
    error,
    getPendingSalesWithDetailsByClient,
  } = usePendingSales();

  const { markSalePaid } = useSales();

  const [markingSaleId, setMarkingSaleId] = useState<number | null>(null);

  useEffect(() => {
    if (opened && client) {
      getPendingSalesWithDetailsByClient(client.id).catch(() => {});
    }
  }, [opened, client, getPendingSalesWithDetailsByClient]);

  const handleMarkPaid = async (sale: Sale) => {
    if (!client) return;
    setMarkingSaleId(sale.id);
    try {
      await markSalePaid(sale.id);
      await getPendingSalesWithDetailsByClient(client.id);
      const {
        pendingSales: remaining,
        totalPending: updatedTotal,
        pendingSalesCount: updatedCount,
      } = usePendingSalesStore.getState();
      useClientStore.setState((prev) => ({
        clients: prev.clients.map((prevClient) => {
          if (prevClient.id === client.id)
            return {
              ...prevClient,
              totalPending: updatedTotal,
              pendingSalesCount: updatedCount,
            };

          return prevClient;
        }),
      }));
      if (remaining.length === 0) {
        onClose();
      }
      toast.success("Venta marcada como pagada.");
    } catch (err) {
      toastAppError(err, "No se pudo marcar la venta como pagada.");
    } finally {
      setMarkingSaleId(null);
    }
  };

  return (
    <Modal
      opened={opened && !!client}
      onClose={onClose}
      centered
      size="lg"
      withCloseButton={false}
      transitionProps={{ transition: "fade-down", duration: 300 }}
    >
      <ModalHeader title="Cuenta corriente" Icon={UserPen} />

      {client ? (
        <p>
          {client.name} {client.lastName} · DNI {client.dni}
        </p>
      ) : null}

      {isLoading ? (
        <div className="flex justify-center py-6">
          <Loader size="sm" />
        </div>
      ) : null}

      {error ? <p className="text-destructive text-sm">{error}</p> : null}

      {!isLoading && !error ? (
        <>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pb-4">
            <span className="text-secondary-foreground">
              {pendingSalesCount}{" "}
              {pendingSalesCount === 1
                ? "venta pendiente"
                : "ventas pendientes"}
            </span>

            <div className="text-right">
              <p className="text-secondary-foreground text-sm">
                Total adeudado
              </p>
              <p className="text-xl font-semibold tabular-nums">
                <NumberFormatter
                  prefix="$"
                  value={totalPending}
                  thousandSeparator
                />
              </p>
            </div>
          </div>

          <ul className="[&>li]:border-background-soft [&>li]:border-t">
            {pendingSales.map((sale: Sale) => (
              <li key={sale.id} className="py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">Venta #{sale.id}</p>
                    <p className="text-secondary-foreground text-xs">
                      {new Date(sale.createdAt).toLocaleDateString("es-AR")} ·{" "}
                      {PAYMENT_METHODS_LABELS[sale.paymentMethod] ??
                        sale.paymentMethod}
                    </p>
                  </div>
                  <p className="text-lg font-semibold tabular-nums">
                    <NumberFormatter
                      prefix="$"
                      value={sale.total}
                      thousandSeparator
                    />
                  </p>
                </div>
                <ul className="mt-3 space-y-1 text-sm">
                  {(sale.details ?? []).map((detail, index) => (
                    <li
                      key={`${detail.productId}-${index}`}
                      className="text-secondary-foreground flex justify-between gap-3"
                    >
                      <span className="min-w-0 wrap-break-word">
                        {detail.quantity} × {detail.productName}
                      </span>
                      <span className="tabular-nums">
                        <NumberFormatter
                          prefix="$"
                          value={detail.quantity * detail.price}
                          thousandSeparator
                        />
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-end">
                  <Button
                    size="xs"
                    onClick={() => handleMarkPaid(sale)}
                    loading={markingSaleId === sale.id}
                    disabled={
                      markingSaleId !== null && markingSaleId !== sale.id
                    }
                  >
                    Marcar como paga
                  </Button>
                </div>
              </li>
            ))}
            {pendingSales.length === 0 ? (
              <p className="text-secondary-foreground py-4 text-sm">
                No tiene ventas pendientes.
              </p>
            ) : null}
          </ul>
        </>
      ) : null}

      <div className="mt-5 flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </Modal>
  );
};
