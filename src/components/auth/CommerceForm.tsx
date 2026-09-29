import { TextInput } from "@mantine/core";
import { Store } from "lucide-react";

export function CommerceForm() {
  return (
    <section className="border-border mb-4 border-b pb-4">
      <p className="text-secondary-foreground pb-4 text-[14px] font-semibold tracking-tight uppercase">
        Datos del negocio
      </p>
      <TextInput
        leftSectionPointerEvents="none"
        name="businessName"
        leftSection={<Store size={20} />}
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
