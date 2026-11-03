import { lazy, useEffect } from "react";
import { TagPlus, Tags } from "lucide-react";
import { Button, Modal } from "@mantine/core";

import { useCategory } from "@features/categories/hooks/useCategory";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { ListContainer } from "@shared/components/ListContainer";
import { CategoryList } from "@features/categories/components/CategoryList";

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

  useEffect(() => {
    getCategories();

    return () => {
      closeFormModal();
    };
  }, [closeFormModal, getCategories]);

  usePageHeader({
    title: "Categorías",
    subtitle: `${categories.length} categorías`,
    actions: (
      <Button
        leftSection={<TagPlus />}
        onClick={openCreate}
        className="bg-primary rounded-md p-2 text-white"
      >
        <span className="hidden sm:inline">Nueva categoría</span>
      </Button>
    ),
  });

  return (
    <>
      <Modal
        opened={isFormModalOpen}
        onClose={closeFormModal}
        centered
        size="md"
        transitionProps={{ transition: "fade-down", duration: 300 }}
        withCloseButton={false}
      >
        <CategoryForm
          key={formCategory?.id ?? "create"}
          category={formCategory}
          closeModal={closeFormModal}
        />
      </Modal>

      <main className="flex flex-col gap-6 p-6">
        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={categories.length === 0}
          icon={Tags}
        >
          <CategoryList categories={categories} />
        </ListContainer>
      </main>
    </>
  );
};
