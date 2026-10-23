import { lazy, useEffect } from "react";
import { TagPlus, Tags } from "lucide-react";
import { Button, Modal } from "@mantine/core";

import { useCategory } from "@/hooks/useCategory";
import { ListContainer } from "@/components/ListContainer";
import { CategoryList } from "@/components/categories/CategoryList";

const NewCategoryForm = lazy(() =>
  import("@/components/categories/NewCategoryForm").then((module) => ({
    default: module.NewCategoryForm,
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
        <NewCategoryForm
          key={formCategory?.id ?? "create"}
          category={formCategory}
          closeModal={closeFormModal}
        />
      </Modal>

      <header className="border-border flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Categorías</h1>
          <p>{categories.length} categorías</p>
        </div>
        <Button
          leftSection={<TagPlus />}
          onClick={openCreate}
          className="bg-primary rounded-md p-2 text-white"
        >
          <span className="hidden sm:inline">Nueva categoría</span>
        </Button>
      </header>

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
