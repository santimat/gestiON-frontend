import { Tags } from "lucide-react";
import { TextInput, Textarea } from "@mantine/core";

import { categoryMapper } from "@features/categories/mappers/categoryMapper";
import { useCategory } from "@features/categories/hooks/useCategory";
import { useEntityForm } from "@shared/hooks/useEntityForm";
import { ModalHeader } from "@shared/components/ModalHeader";
import { ModalFormActions } from "@shared/components/ModalFormActions";
import type { Category, CategoryRequest } from "@features/categories/types";

type NewCategoryFormProps = {
  category: Category | null;
  closeModal: () => void;
};

const DEFAULT_CATEGORY_FORM: CategoryRequest = {
  name: "",
  description: "",
};

export const CategoryForm = ({
  category,
  closeModal,
}: NewCategoryFormProps) => {
  const { handleCreateCategory, updateCategory } = useCategory();
  const isEditing = category !== null;

  const {
    form: categoryForm,
    setForm: setCategoryForm,
    errors,
    isSubmitting,
    handleSubmit,
  } = useEntityForm<CategoryRequest>({
    initialValues: category
      ? categoryMapper.toForm(category)
      : DEFAULT_CATEGORY_FORM,
    isEditing,
    closeModal,
    submit: async (form) => {
      if (isEditing && category) await updateCategory(category.id, form);
      else await handleCreateCategory(form);
    },
    successMessages: {
      create: "Categoría creada con éxito",
      update: "Categoría actualizada con éxito",
    },
    errorMessages: {
      create: "No se pudo crear la categoría.",
      update: "No se pudo actualizar la categoría.",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCategoryForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <ModalHeader
        title={isEditing ? "Editar Categoría" : "Nueva Categoría"}
        Icon={Tags}
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
            onChange={handleChange}
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
