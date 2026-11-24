import { Button } from "@mantine/core";
import type { CartLine } from "@features/sales/types";

type ConfirmButtonProps = {
  cart: CartLine[];
  isSubmitting?: boolean;
  disabled?: boolean;
  onConfirm: () => void;
};

export const ConfirmButton = ({
  cart,
  isSubmitting = false,
  disabled = false,
  onConfirm,
}: ConfirmButtonProps) => (
  <Button
    onClick={onConfirm}
    disabled={cart.length === 0 || isSubmitting || disabled}
    className="bg-primary mt-4 h-11 w-full rounded-md text-base"
  >
    Confirmar venta
  </Button>
);
