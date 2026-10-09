import Fuse from "fuse.js";
import { ListSortAscending } from "lucide-react";
import {
  Modal,
  Select,
  type ComboboxItem,
  type OptionsFilter,
} from "@mantine/core";

import type { ProductForm } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import { useCategory } from "@/hooks/useCategory";

type SelectCategoryProps = {
  setProductForm: React.Dispatch<React.SetStateAction<ProductForm>>;
  formCategoryId: string | null;
};

export const SelectCategory = ({
  setProductForm,
  formCategoryId,
}: SelectCategoryProps) => {
  const { categories } = useCategory();

  const [opened, { open: openModal, close: closeModal }] = useDisclosure(true);

  const selectCategories: ComboboxItem[] = [
    {
      value: "",
      label: "Seleccionar categoría",
      disabled: true,
    },
    {
      value: "ADD_NEW_CATEGORY",
      label: "Agregar nueva categoría",
    },
    ...categories.map((category) => ({
      value: String(category.id),
      label: category.name,
    })),
  ];

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    if (!search.trim()) return options;
    const fuse = new Fuse(options as ComboboxItem[], {
      keys: ["label"],
      threshold: 0.3,
      minMatchCharLength: 2,
    });

    return fuse.search(search).map((result) => result.item);
  };

  const handleSelectChange = (value: string | null) => {
    setProductForm((prevState) => ({
      ...prevState,
      categoryId: value ?? "",
    }));

    if (value === "ADD_NEW_CATEGORY") {
      openModal();
      // Abrir modal para crear nueva categoría
      // Una vez creada, actualizar productForm.categoryId con el id de la nueva categoría
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        centered
        withCloseButton={false}
      >
        <header>Nueva categoría</header>
        <NewCategoryForm closeModal={closeModal} />
      </Modal>
      <Select
        label="Categoría"
        leftSection={<ListSortAscending size={20} />}
        placeholder="Seleccioná una categoría"
        data={selectCategories}
        searchable
        nothingFoundMessage="No se encontraron categorías"
        value={formCategoryId}
        filter={optionsFilter}
        onChange={handleSelectChange}
        required
      />
    </>
  );
};
