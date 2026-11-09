import { Image, StoreIcon, UploadIcon } from "lucide-react";
import { Avatar, FileInput, TextInput } from "@mantine/core";

import type { CurrentCommerce } from "@/features/commerces";

type CommerceForm = CurrentCommerce & { businessImage?: File | null };

type NameAndImageFormProps = {
  commerceForm: CommerceForm | null;
  setCommerceForm: React.Dispatch<React.SetStateAction<CommerceForm | null>>;
};

export const NameAndImageSection = ({
  commerceForm,
  setCommerceForm,
}: NameAndImageFormProps) => {
  const avatarSrc = commerceForm?.businessImage
    ? URL.createObjectURL(commerceForm.businessImage)
    : commerceForm?.businessLogoUrl;

  const handleChangeFile = (file: File | null) => {
    setCommerceForm(
      (prev) => ({ ...prev, businessImage: file }) as CommerceForm,
    );
  };

  return (
    <section className="border-primary rounded-xl border p-4 md:p-2">
      <header className="flex items-center gap-2 p-2">
        <StoreIcon size={24} className="text-primary" />
        <p className="font-semibold">Comercio</p>
      </header>
      <main className="grid grid-cols-2 items-end gap-4 px-4 pb-4">
        <TextInput
          className="col-span-2 md:col-span-1"
          label="Nombre del negocio"
          value={commerceForm?.name ?? ""}
          onChange={(e) =>
            setCommerceForm(
              (prev) =>
                (prev
                  ? { ...prev, name: e.target.value }
                  : prev) as CommerceForm,
            )
          }
        />
        <div className="col-span-2 flex items-end gap-4 md:col-span-1">
          <Avatar
            size="xl"
            variant="outline"
            radius="lg"
            aria-label="Foto del comercio"
            src={avatarSrc}
          >
            <span className="p-4">
              <Image className="text-secondary-foreground" size={40} />
            </span>
          </Avatar>
          <div>
            <FileInput
              aria-label="Subir foto del comercio"
              label="Foto del comercio"
              className="w-full"
              placeholder="Subir foto"
              rightSection={<UploadIcon size={20} />}
              value={commerceForm?.businessImage ?? null}
              onChange={handleChangeFile}
              rightSectionPointerEvents={"none"}
              valueComponent={({ value }) => {
                if (!value) return null;
                const file = Array.isArray(value) ? value[0] : value;
                if (!file) return null;
                return (
                  <p title={file.name} className="max-w-50 truncate text-sm">
                    {file.name}
                  </p>
                );
              }}
            />
            <p className="text-secondary-foreground text-sm">
              Formato JPEG, WEBP, PNG
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};
