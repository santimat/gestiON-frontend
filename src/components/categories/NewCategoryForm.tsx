import { useState } from "react";
import { TextInput, Textarea } from "@mantine/core";
import { Tags, UserPen } from "lucide-react";
import type { ChangeEvent, SubmitEvent } from "react";

import { ModalHeader } from "@/components/ModalHeader";
import { ModalFormActions } from "@/components/ModalFormActions";
import type { Category } from "@/types";

type CategoryDraft = Pick<Category, "id" | "name" | "description">;

type NewCategoryFormProps = {
  category: CategoryDraft | null;
  categories: Category[];
  onSave: ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => void;
  closeModal: () => void;
};

const DEFAULT_CATEGORY_DRAFT = { name: "", description: "" };

export const NewCategoryForm = ({
  category,
  categories,
  onSave,
  closeModal,
}: NewCategoryFormProps) => {
  const isEditing = category !== null;

  const [categoryForm, setCategoryForm] = useState(() =>
    category
      ? { name: category.name, description: category.description ?? "" }
      : DEFAULT_CATEGORY_DRAFT,
  );
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const duplicated = categories.some(
      (c) =>
        c.id !== category?.id &&
        c.name.trim().toLowerCase() === categoryForm.name.trim().toLowerCase(),
    );

    if (duplicated) {
      setErrors({ name: "Ya existe una categoría con ese nombre" });
      return;
    }

    setIsSubmitting(true);
    try {
      onSave(categoryForm);
      setErrors({});
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <ModalHeader
        title={isEditing ? "Editar Categoría" : "Nueva Categoría"}
        Icon={UserPen}
      />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <TextInput
            leftSection={<Tags size={20} />}
            name="name"
            label="Nombre"
            placeholder="Ej. Lácteos"
            value={categoryForm.name}
            error={errors.name}
            onChange={handleChange}
            required
          />

          <Textarea
            name="description"
            label="Descripción (opcional)"
            placeholder="Descripción de la categoría"
            value={categoryForm.description}
            onChange={handleTextAreaChange}
            rows={2}
          />

          <p className="text-secondary-foreground text-xs">
            Al renombrar una categoría se actualizan todos sus productos.
          </p>
        </div>
        <ModalFormActions
          submitText={isEditing ? "Guardar cambios" : "Agregar"}
          closeModal={closeModal}
          isSubmitting={isSubmitting}
        />
      </form>
    </>
  );
};
