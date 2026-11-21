import { useState } from "react";
import { Button, Modal, NumberInput } from "@mantine/core";
import { ReceiptText } from "lucide-react";
import { toast } from "sonner";

import type { Sale } from "@features/sales/types";
import { formatCurrency } from "@shared/utils/money";
import { ModalHeader } from "@shared/components/ModalHeader";
import { SaleStatusBadge } from "@/features/sales/components/sales/SaleStatusBadge";
import { SaleDetailModalList } from "@features/sales/components/sales/SaleDetailModalList";
import { SaleDetailModalField } from "@features/sales/components/sales/SaleDetailModalField";
import { useSaleDetails } from "@features/sales/hooks/useSaleDetails";
import { toastAppError } from "@shared/utils/toastAppError";

type SaleDetailModalProps = {
  opened: boolean;
  sale: Sale | null;
  closeModal: () => void;
  onPaymentSuccess?: () => void;
};

export const SaleDetailModal = ({
  opened,
  sale,
  closeModal,
  onPaymentSuccess,
}: SaleDetailModalProps) => {
  const { registerPayment, isRegisteringPayment } = useSaleDetails();
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  if (!sale?.id) return null;

  const sellPointName = sale.sellPointName ?? "Vendido por el dueño";
  const subtotal = formatCurrency(sale.subtotal);
  const discount = sale.discount
    ? `${
        sale.discountType === "PERCENTAGE"
          ? `%${sale.discount}`
          : formatCurrency(sale.discount)
      }`
    : null;
  const total = formatCurrency(sale.total);
  const showPending = sale.status === "PENDING" || sale.status === "PARTIAL_PAYED";
  const totalPending = showPending && sale.totalPending != null
    ? sale.totalPending
    : null;

  const validateAmount = (value: string): boolean => {
    const num = Number(value);
    if (value === "" || num <= 0) {
      setAmountError("El monto debe ser mayor a 0");
      return false;
    }
    if (totalPending != null && num > totalPending) {
      setAmountError(`El monto no puede superar el pendiente ($${formatCurrency(totalPending)})`);
      return false;
    }
    setAmountError("");
    return true;
  };

  const handleRegisterPayment = async () => {
    if (!validateAmount(amount)) return;

    const amountNum = Number(amount);
    try {
      await registerPayment(sale.id, amountNum);
      toast.success("Pago registrado correctamente");
      closeModal();
      onPaymentSuccess?.();
    } catch (error) {
      toastAppError(error, "No se pudo registrar el pago.");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      centered
      size="md"
      transitionProps={{ transition: "fade-down", duration: 300 }}
      withCloseButton={false}
    >
      <ModalHeader title={`Venta #${sale.id}`} Icon={ReceiptText} />

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <SaleDetailModalField
            title="Cliente"
            content={sale.clientName ?? "Consumidor Final"}
          />
          <div className="flex flex-col">
            <p className="text-secondary-foreground text-xs">Estado</p>
            <SaleStatusBadge status={sale.status} />
          </div>
        </div>
        <SaleDetailModalList details={sale.details} />
        <div className="flex items-center justify-between">
          <SaleDetailModalField title="Cajero" content={sale.userName} />
          <SaleDetailModalField
            title="Punto de venta"
            content={sellPointName}
          />
        </div>

        <hr className="text-background-soft" />

        <div className="flex items-center justify-between">
          <p className="text-secondary-foreground">Subtotal</p>
          <p className="font-semibold">{subtotal}</p>
        </div>

        {discount && (
          <div className="flex items-center justify-between">
            <p className="text-secondary-foreground">Descuento</p>
            <p className="text-destructive font-semibold">-{discount}</p>
          </div>
        )}
        <div className="flex items-end justify-between pt-3">
          <p className="font-semibold">Total</p>
          <p className="text-xl font-semibold tabular-nums">{total}</p>
        </div>

        {totalPending != null && (
          <div className="flex items-center justify-between text-warning">
            <p className="font-semibold">Pendiente</p>
            <p className="text-xl font-semibold tabular-nums">{formatCurrency(totalPending)}</p>
          </div>
        )}

        {showPending && (
          <div className="space-y-2 pt-2">
            <NumberInput
              label="Monto a pagar"
              placeholder="$0"
              value={amount}
              onChange={(value) => setAmount(value?.toString() ?? "")}
              error={amountError ? amountError : undefined}
              min={0.01}
              max={totalPending ?? undefined}
              step={0.01}
              required
              className="w-full"
            />
            <Button
              className="h-10 w-full"
              onClick={handleRegisterPayment}
              loading={isRegisteringPayment}
              disabled={isRegisteringPayment}
            >
              Registrar pago
            </Button>
          </div>
        )}

        <Button
          variant="default"
          className="hover:bg-background-soft! shadow-raised h-10 w-full"
          onClick={closeModal}
        >
          Cerrar
        </Button>
      </div>
    </Modal>
  );
};
