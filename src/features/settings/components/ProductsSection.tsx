import { useState } from "react";
import { NumberInput } from "@mantine/core";
import { CircleAlert, PackageIcon } from "lucide-react";

import type { FieldErrors } from "@shared/types";
import type { CurrentCommerce } from "@features/commerces";
import { SettingsFormSection } from "@features/settings/components/SettingsFormSection";

type ProductsSectionProps = {
  commerceForm: CurrentCommerce | null;
  setCommerceForm: React.Dispatch<React.SetStateAction<CurrentCommerce | null>>;
  errors: FieldErrors;
};

export const ProductsSection = ({
  commerceForm,
  setCommerceForm,
  errors,
}: ProductsSectionProps) => {
  const [inputValue, setInputValue] = useState<string | number>(
    commerceForm?.defaultMinStock ?? 3,
  );

  const handleChange = (value: string | number) => {
    setInputValue(value);
    setCommerceForm((prev) =>
      prev
        ? {
            ...prev,
            defaultMinStock: value === "" ? 0 : Number(value),
          }
        : prev,
    );
  };

  return (
    <SettingsFormSection mainClasses="p-4" title="Productos" icon={PackageIcon}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold">Stock mínimo por defecto</p>
          <p className="text-secondary-foreground text-sm">
            Valor que se aplicará automáticamente al crear o editar un producto
            cuando no se especifique un stock mínimo.
          </p>
        </div>

        <NumberInput
          name="defaultMinStock"
          aria-label="Stock mínimo por defecto"
          placeholder="3"
          min={1}
          decimalScale={0}
          allowNegative={false}
          leftSection={<CircleAlert size={20} />}
          value={inputValue}
          onChange={handleChange}
          error={errors.defaultMinStock}
          className="w-full md:max-w-44"
        />
      </div>
    </SettingsFormSection>
  );
};
