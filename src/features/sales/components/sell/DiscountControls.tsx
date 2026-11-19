import { NumberInput } from "@mantine/core";
import type { DiscountType, SetSaleDraft } from "@features/sales";

type DiscountControlsProps = {
  discount: number;
  discountType: DiscountType;
  hasPaymentOffer: boolean;
  onChange: SetSaleDraft;
};

const DISCOUNT_TYPES: DiscountType[] = ["FIXED_AMOUNT", "PERCENTAGE"];

export const DiscountControls = ({
  discount,
  discountType,
  hasPaymentOffer,
  onChange,
}: DiscountControlsProps) => (
  <div className="mt-4 space-y-2">
    <p className="text-sm font-medium">Descuento</p>
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
      <NumberInput
        min={0}
        value={discount}
        disabled={hasPaymentOffer}
        onChange={(value) => onChange({ discount: Number(value) || 0 })}
        aria-label="Importe del descuento"
      />
      <div className="border-background-soft flex rounded-lg border p-1">
        {DISCOUNT_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            disabled={hasPaymentOffer}
            onClick={() => onChange({ discountType: type })}
            className={`rounded-md px-2.5 text-sm font-medium transition-colors ${
              discountType === type
                ? "bg-primary-soft text-primary"
                : "text-secondary-foreground hover:bg-background-soft"
            } ${hasPaymentOffer ? "opacity-50" : ""}`}
          >
            {type === "FIXED_AMOUNT" ? "$" : "%"}
          </button>
        ))}
      </div>
    </div>
  </div>
);