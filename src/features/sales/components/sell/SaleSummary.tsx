import { useClient } from "@features/clients";
import { useSale } from "@features/sales/hooks/useSale";
import { useOfferPaymentMethod } from "@features/offers";
import { SaleTotals } from "@features/sales/components/sell/SaleTotals";
import { ConfirmButton } from "@features/sales/components/sell/ConfirmButton";
import { ClientSelector } from "@features/sales/components/sell/ClientSelector";
import { useSaleCalculations } from "@features/sales/hooks/useSaleCalculations";
import { DiscountControls } from "@features/sales/components/sell/DiscountControls";
import { PaymentMethodSelector } from "@features/sales/components/sell/PaymentMethodSelector";

type SaleSummaryProps = {
  onConfirm: () => void;
  isSubmitting?: boolean;
};

export const SaleSummary = ({
  onConfirm,
  isSubmitting = false,
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
    SelectedIcon,
    clientId,
    paymentMethod,
    discount,
    discountType,
  } = useSaleCalculations({ cart, saleDraft, offerPaymentMethods });

  return (
    <div className="border-background-soft bg-card shadow-card rounded-xl border p-4 lg:sticky lg:top-6">
      <SaleTotals
        subtotal={subtotal}
        discountValue={discountValue}
        total={total}
      />

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
        SelectedIcon={SelectedIcon}
        onChange={setSaleDraft}
      />

      <ConfirmButton
        cart={cart}
        isSubmitting={isSubmitting}
        onConfirm={onConfirm}
      />
    </div>
  );
};
