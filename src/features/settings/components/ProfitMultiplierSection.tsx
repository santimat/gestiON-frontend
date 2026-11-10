import { useState } from "react";
import { Slider } from "@mantine/core";
import { TrendingUp } from "lucide-react";

import type { CurrentCommerce } from "@/features/commerces";
import {
  parseMultiplier,
  extractMultiplier,
} from "@/shared/utils/parseMultiplier";
import { formatCurrency } from "@/shared/utils/money";
import { SettingsFormSection } from "./SettingsFormSection";

type ProfitMultiplierSectionProps = {
  commerceForm: CurrentCommerce | null;
  setCommerceForm: React.Dispatch<React.SetStateAction<CurrentCommerce | null>>;
};

export const ProfitMultiplierSection = ({
  commerceForm,
  setCommerceForm,
}: ProfitMultiplierSectionProps) => {
  const profitMultiplier = extractMultiplier(commerceForm?.profitMultiplier);

  const [sliderValue, setSliderValue] = useState<number>(profitMultiplier);
  const suggestedPrice = formatCurrency(1000 * parseMultiplier(sliderValue));

  const handleSliderChangeEnd = (value: number) => {
    const formattedvalue = parseMultiplier(value);

    setCommerceForm(
      (prev) =>
        ({ ...prev, profitMultiplier: formattedvalue }) as CurrentCommerce,
    );
  };

  return (
    <SettingsFormSection mainClasses="p-4" title="Ganancias" icon={TrendingUp}>
      <div>
        <p className="text-sm font-semibold">Multiplicador de ganancias</p>
        <p className="text-secondary-foreground text-sm">
          Porcentaje de ganancia que se aplica para calcular los precios
          sugeridos la hora de registrar productos
        </p>
        <div className="pt-8 pb-10 md:mx-auto md:w-[80%]">
          <Slider
            min={0}
            max={100}
            value={sliderValue}
            onChange={(value) => setSliderValue(value)}
            onChangeEnd={handleSliderChangeEnd}
            marks={[
              { value: 20, label: "20%" },
              { value: 50, label: "50%" },
              { value: 80, label: "80%" },
            ]}
            name="profitMultiplier"
          />
        </div>
      </div>
      <div className="mx-auto flex items-center justify-between md:max-w-[60%]">
        <div>
          <p className="text-secondary-foreground text-sm">Ejemplo: Costo</p>
          <p className="font-semibold">$1000</p>
        </div>
        <div>
          <p className="text-secondary-foreground text-sm">Precio sugerido</p>
          <p className="text-primary font-semibold">+{suggestedPrice}</p>
        </div>
      </div>
    </SettingsFormSection>
  );
};
