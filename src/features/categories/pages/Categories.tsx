import { lazy, useEffect } from "react";
import { TagPlus, Tags } from "lucide-react";
import { Button } from "@mantine/core";

import { useCategory } from "@features/categories/hooks/useCategory";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { useFilters } from "@shared/hooks/useFilters";
import { ListContainer } from "@shared/components/ListContainer";
import { EntityFormModal } from "@shared/components/EntityFormModal";
import { CategoryList } from "@features/categories/components/CategoryList";
import { CategoriesFilterBar } from "@features/categories/components/CategoriesFilterBar";
import { CategoryFiltersSchema } from "@features/categories/schemas/CategoryFiltersSchema";

const CategoryForm = lazy(() =>
  import("@features/categories/components/CategoryForm").then((module) => ({
    default: module.CategoryForm,
  })),
);

export const Categories = () => {
  const {
    isFormModalOpen,
    closeFormModal,
    formCategory,
    categories,
    getCategories,
    openCreate,
    isLoading,
    error,
  } = useCategory();

  const { filters, setFilters, hasFilters } = useFilters(CategoryFiltersSchema);

  // el backend todavía no filtra categorías: por ahora el filtro se aplica acá
  const visibleCategories = filters.categoryId
    ? categories.filter((category) => category.id === filters.categoryId)
    : categories;

  useEffect(() => {
    getCategories();

    return () => {
      closeFormModal();
    };
  }, [closeFormModal, getCategories]);

  usePageHeader({
    title: "Categorías",
    subtitle: `${visibleCategories.length} categorías`,
    actions: (
      <Button
        leftSection={<TagPlus />}
        onClick={openCreate}
        className="bg-primary text-primary-foreground rounded-md p-2"
      >
        <span className="hidden sm:inline">Nueva categoría</span>
      </Button>
    ),
  });

  return (
    <>
      <EntityFormModal
        opened={isFormModalOpen}
        closeModal={closeFormModal}
        size="md"
        entityKey={formCategory?.id ?? "create"}
      >
        <CategoryForm category={formCategory} closeModal={closeFormModal} />
      </EntityFormModal>

      <main className="flex flex-col gap-6">
        <CategoriesFilterBar
          filters={filters}
          setFilters={setFilters}
          categories={categories}
        />
        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={visibleCategories.length === 0}
          icon={Tags}
          emptyMessage={
            hasFilters
              ? "Ninguna categoría coincide con el filtro"
              : "No hay categorías para mostrar"
          }
        >
          <CategoryList categories={visibleCategories} />
        </ListContainer>
      </main>
    </>
  );
};
