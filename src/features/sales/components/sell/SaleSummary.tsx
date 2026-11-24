import { useClient } from "@features/clients";
import { useSale } from "@features/sales/hooks/useSale";
import { useOfferPaymentMethod } from "@features/offers";
import { Badge } from "@mantine/core";
import { AlertCircle } from "lucide-react";
import { formatCurrency } from "@shared/utils/money";
import { SaleTotals } from "@features/sales/components/sell/SaleTotals";
import { ConfirmButton } from "@features/sales/components/sell/ConfirmButton";
import { ClientSelector } from "@features/sales/components/sell/ClientSelector";
import { useSaleCalculations } from "@features/sales/hooks/useSaleCalculations";
import { DiscountControls } from "@features/sales/components/sell/DiscountControls";
import { PaymentMethodSelector } from "@features/sales/components/sell/PaymentMethodSelector";

type SaleSummaryProps = {
  onConfirm: () => void;
  isSubmitting?: boolean;
  isConfirmDisabled?: boolean;
};

export const SaleSummary = ({
  onConfirm,
  isSubmitting = false,
  isConfirmDisabled = false,
}: SaleSummaryProps) => {
  const { cart, saleDraft, setSaleDraft } = useSale();
  const { clients } = useClient();
  const { offerPaymentMethods } = useOfferPaymentMethod();

  const {
    subtotal,
    discountValue,
    total,
    hasPaymentOffer,
    selectedPaymentOffer,
    clientId,
    paymentMethod,
    discount,
    discountType,
  } = useSaleCalculations({ cart, saleDraft, offerPaymentMethods });

  const selectedClient = clients.find((c) => c.id === clientId);
  const showPendingWarning =
    clientId &&
    selectedClient &&
    (selectedClient.totalPending ?? 0) > 0 &&
    paymentMethod === "CREDIT_ACCOUNT";

  return (
    <div className="border-background-soft bg-card shadow-card rounded-xl border p-4 lg:sticky lg:top-6">
      <SaleTotals
        subtotal={subtotal}
        discountValue={discountValue}
        total={total}
      />

      {showPendingWarning && (
        <div
          className="bg-warning/10 text-warning border-warning/20 mb-4 flex items-center gap-2 rounded-md border p-3"
          role="alert"
        >
          <AlertCircle size={18} strokeWidth={2} aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">
              El cliente adeuda{" "}
              <span className="tabular-nums">
                {formatCurrency(selectedClient.totalPending ?? 0)}
              </span>
            </p>
            <p className="text-xs opacity-80">
              Se registrará una nueva venta en cuenta corriente.
            </p>
          </div>
          <Badge size="sm" color="yellow" variant="filled">
            Cuenta corriente
          </Badge>
        </div>
      )}

      <DiscountControls
        discount={discount}
        discountType={discountType}
        hasPaymentOffer={hasPaymentOffer}
        onChange={setSaleDraft}
      />

      <ClientSelector
        clients={clients}
        clientId={clientId}
        onChange={setSaleDraft}
      />

      <PaymentMethodSelector
        paymentMethod={paymentMethod}
        clientId={clientId}
        hasPaymentOffer={hasPaymentOffer}
        selectedPaymentOffer={selectedPaymentOffer}
        offerPaymentMethods={offerPaymentMethods}
        onChange={setSaleDraft}
      />

      <ConfirmButton
        cart={cart}
        isSubmitting={isSubmitting}
        disabled={isConfirmDisabled}
        onConfirm={onConfirm}
      />
    </div>
  );
};
