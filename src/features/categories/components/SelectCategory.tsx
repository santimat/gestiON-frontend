import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { ListSortAscending, PlusIcon, XIcon } from "lucide-react";
import {
  Loader,
  Select,
  type ComboboxItem,
  type OptionsFilter,
} from "@mantine/core";

import type { ProductFormValues } from "@features/products";
import { toastAppError } from "@shared/utils/toastAppError";
import type { Category } from "@features/categories/types";
import { categoryService } from "@features/categories/services/categoryService";
import { NewCategoryInline } from "@features/categories/components/NewCategoryInline";

const SEARCH_DEBOUNCE_MS = 300;
const SEARCH_PAGE_SIZE = 20;

// el filtrado real lo hace el backend: no volver a filtrar en memoria
const passthroughFilter: OptionsFilter = ({ options }) => options;

type SelectCategoryProps = {
  setProductForm: React.Dispatch<React.SetStateAction<ProductFormValues>>;
  productForm: ProductFormValues;
  // categoría del producto que se edita: garantiza el label aunque no venga en la búsqueda
  initialCategory?: Category | null;
  error?: string;
};

export const SelectCategory = ({
  setProductForm,
  productForm,
  initialCategory = null,
  error,
}: SelectCategoryProps) => {
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, SEARCH_DEBOUNCE_MS);
  const [options, setOptions] = useState<Category[]>([]);
  // última búsqueda resuelta (con éxito o error); null = todavía no respondió
  const [resolvedQuery, setResolvedQuery] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    initialCategory,
  );

  // Mantine copia el label del valor elegido al input de búsqueda: en ese caso
  // no es una búsqueda real, así que se piden las categorías sin filtro
  const query =
    debouncedSearch.trim() === selectedCategory?.name.trim()
      ? ""
      : debouncedSearch.trim();

  // derivado: está cargando mientras la búsqueda actual no haya respondido
  const isLoading = resolvedQuery !== query;

  useEffect(() => {
    let ignore = false;

    categoryService
      .getCategories({
        categoryName: query || undefined,
        size: SEARCH_PAGE_SIZE,
        sortBy: "name",
        sortDir: "asc",
      })
      .then((data) => {
        if (!ignore) setOptions(data?.content ?? []);
      })
      .catch((err) => {
        if (!ignore) {
          toastAppError(err, "No se pudieron cargar las categorías.");
        }
      })
      .finally(() => {
        if (!ignore) setResolvedQuery(query);
      });

    // descarta respuestas viejas si el usuario sigue escribiendo
    return () => {
      ignore = true;
    };
  }, [query]);

  // resultados del backend + la categoría seleccionada (sin duplicar por id)
  const categories =
    selectedCategory && !options.some((c) => c.id === selectedCategory.id)
      ? [selectedCategory, ...options]
      : options;

  // solo las categorías activas se pueden elegir; una inactiva ya asignada se
  // muestra deshabilitada para que el campo no quede vacío al editar
  const selectCategories: ComboboxItem[] = categories.map((category) => ({
    value: String(category.id),
    label: category.active ? category.name : `${category.name} (inactiva)`,
    disabled: !category.active,
  }));

  const handleSelectChange = (value: string | null) => {
    if (!value?.length) return;
    const category = categories.find((c) => String(c.id) === value);
    if (category) setSelectedCategory(category);
    setProductForm((prevState) => ({
      ...prevState,
      categoryId: Number(value),
    }));
  };

  const handleCategoryCreated = (category: Category) => {
    setSelectedCategory(category);
    setOptions((prev) =>
      prev.some((c) => c.id === category.id) ? prev : [category, ...prev],
    );
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
            onCreated={handleCategoryCreated}
          />
        ) : (
          <Select
            label="Categoría"
            leftSection={<ListSortAscending size={20} />}
            rightSection={isLoading ? <Loader size="xs" /> : undefined}
            placeholder="Seleccioná una categoría"
            data={selectCategories}
            searchable
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            name="categoryId"
            nothingFoundMessage={
              isLoading
                ? "Buscando categorías..."
                : "No se encontraron categorías"
            }
            value={
              productForm.categoryId ? String(productForm.categoryId) : null
            }
            filter={passthroughFilter}
            onChange={handleSelectChange}
            error={error}
            required
          />
        )}
      </div>
    </>
  );
};
