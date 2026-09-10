import { TextInput } from "@mantine/core";
import { Store } from "lucide-react";

export function CommerceForm() {
  return (
    <section className="border-b border-border pb-4 mb-4">
      <p className="uppercase text-secondary-foreground font-semibold text-[14px] tracking-tight pb-4">
        Datos del negocio
      </p>
      <TextInput
        leftSectionPointerEvents="none"
        name="businessName"
        leftSection={<Store className="w-5 h-5" />}
        placeholder="Almacén don pepe"
        label="Nombre del comercio"
        mb={"sm"}
      />
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          name="cuit"
          leftSectionPointerEvents="none"
          placeholder="20-23456798-1"
          label="CUIT"
        />
        <TextInput
          leftSectionPointerEvents="none"
          placeholder="2346567432"
          name="phoneNumber"
          label="Teléfono"
        />
      </div>
    </section>
  );
}
