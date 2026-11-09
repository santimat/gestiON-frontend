import { useEffect } from "react";
import { Button, Loader, Modal, NumberFormatter } from "@mantine/core";

import { usePendingSales } from "@features/sales";
import type { Sale } from "@features/sales/types";
import type { Client } from "@features/clients/types";
import { PAYMENT_METHODS_LABELS } from "@features/sales/dictionary";
import { ModalHeader } from "@/shared/components/ModalHeader";
import { UserPen } from "lucide-react";

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

  useEffect(() => {
    if (opened && client) {
      getPendingSalesWithDetailsByClient(client.id).catch(() => {});
    }
  }, [opened, client, getPendingSalesWithDetailsByClient]);

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
