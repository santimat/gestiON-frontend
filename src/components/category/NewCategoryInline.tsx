import { toast } from "sonner";
import { useState } from "react";
import { Button, TextInput } from "@mantine/core";

import { useCategory } from "@/hooks/useCategory";
import type { AppError, FieldErrors, ProductForm } from "@/types";

type NewCategoryInlineProps = {
  setIsNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setProductForm: React.Dispatch<React.SetStateAction<ProductForm>>;
};

export const NewCategoryInline = ({
  setProductForm,
  setIsNewCategory,
}: NewCategoryInlineProps) => {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [newCategoryName, setNewCategoryName] = useState("");
  const { createCategory } = useCategory();

  const handleClick = async () => {
    try {
      const newCategory = await createCategory({ name: newCategoryName });

      setProductForm((prevState) => ({
        ...prevState,
        categoryId: Number(newCategory.id),
      }));
      setErrors({});
      setIsNewCategory(false);
      toast.success("Categoría creada con éxito");
    } catch (error) {
      const appError = error as AppError;
      if (appError.fieldErrors) {
        return setErrors(appError.fieldErrors);
      }
      toast.error(appError?.message ?? "No se pudo crear la categoría.");
    }
  };

  return (
    <div className="flex gap-1">
      <TextInput
        label="Categorías"
        placeholder="Ej: Escolar"
        className="flex-1"
        name="name"
        error={errors?.name}
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
      <Button className="self-end" onClick={handleClick}>
        Crear
      </Button>
    </div>
  );
};
