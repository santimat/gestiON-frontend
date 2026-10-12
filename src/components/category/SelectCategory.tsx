import Fuse from "fuse.js";
import { useState } from "react";
import { ListSortAscending, PlusIcon, XIcon } from "lucide-react";
import { Select, type ComboboxItem, type OptionsFilter } from "@mantine/core";

import type { ProductForm } from "@/types";
import { useCategory } from "@/hooks/useCategory";
import { NewCategoryInline } from "@/components/category/NewCategoryInline";

type SelectCategoryProps = {
  setProductForm: React.Dispatch<React.SetStateAction<ProductForm>>;
  productForm: ProductForm;
  error?: string;
};

export const SelectCategory = ({
  setProductForm,
  productForm,
  error,
}: SelectCategoryProps) => {
  const { categories } = useCategory();
  const [isNewCategory, setIsNewCategory] = useState(false);

  const selectCategories: ComboboxItem[] = [
    {
      value: "",
      label: "Seleccioná una categoría",
      disabled: true,
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
    if (!value?.length) return;
    setProductForm((prevState) => ({
      ...prevState,
      categoryId: Number(value),
    }));
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          className="text-primary absolute top-1 right-2 flex items-center gap-1 text-[14px]! hover:cursor-pointer hover:underline"
          onClick={() => setIsNewCategory(!isNewCategory)}
        >
          {isNewCategory ? (
            <>
              <XIcon size={10} />
              Cancelar
            </>
          ) : (
            <>
              <PlusIcon size={10} />
              Nueva
            </>
          )}
        </button>
        {isNewCategory ? (
          <NewCategoryInline
            setProductForm={setProductForm}
            setIsNewCategory={setIsNewCategory}
          />
        ) : (
          <Select
            label="Categoría"
            leftSection={<ListSortAscending size={20} />}
            placeholder="Seleccioná una categoría"
            data={selectCategories}
            searchable
            name="categoryId"
            nothingFoundMessage="No se encontraron categorías"
            value={productForm.categoryId ? String(productForm.categoryId) : ""}
            filter={optionsFilter}
            onChange={handleSelectChange}
            error={error}
            required
          />
        )}
      </div>
    </>
  );
};
