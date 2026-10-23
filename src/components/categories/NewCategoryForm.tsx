import { Tags } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { TextInput, Textarea } from "@mantine/core";

import { categoryMapper } from "@/mappers";
import { useCategory } from "@/hooks/useCategory";
import { ModalHeader } from "@/components/ModalHeader";
import { DEFAULT_CATEGORY_FORM } from "@/utils/constants";
import { ModalFormActions } from "@/components/ModalFormActions";
import type { AppError, Category, CategoryRequest, FieldErrors } from "@/types";
import { toast } from "sonner";

type NewCategoryFormProps = {
  category: Category | null;
  closeModal: () => void;
};

export const NewCategoryForm = ({ category }: NewCategoryFormProps) => {
  const { closeFormModal, createCategory, updateCategory } = useCategory();
  const isEditing = category !== null;

  const [categoryForm, setCategoryForm] = useState<CategoryRequest>(() =>
    category ? categoryMapper.toForm(category) : DEFAULT_CATEGORY_FORM,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCategoryForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const categoryRequest = Object.fromEntries(
      formData.entries(),
    ) as CategoryRequest;
    setIsSubmitting(true);

    try {
      if (isEditing) {
        await updateCategory(category.id, categoryRequest);
        toast.success(`Categoría actualizada con éxito`);
      } else {
        await createCategory(categoryRequest);
        toast.success(`Categoría creada con éxito`);
      }
      closeFormModal();
    } catch (error) {
      const appError = error as AppError;
      if (appError.fieldErrors) return setErrors(appError.fieldErrors);
      toast.error(appError.message);
    } finally {
      setIsSubmitting(false);
    }
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
          closeModal={closeFormModal}
          isSubmitting={isSubmitting}
        />
      </form>
    </>
  );
};
