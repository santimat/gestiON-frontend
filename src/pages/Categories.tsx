import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "sonner";

import { CategoryList } from "@/components/categories/CategoryList";
import { NewCategoryForm } from "@/components/categories/NewCategoryForm";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import type { Category } from "@/types";

// datos mockeados para la fase de preview UI: sin tipo a propósito.
// En la fase siguiente salen de useCategoryStore y el conteo de productos
// viene de useProductStore
const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "Lácteos",
    description: "Leches, yogures y quesos",
    createdAt: new Date("2026-01-15"),
    productCount: 8,
  },
  {
    id: 2,
    name: "Almacén",
    description: "Harinas, aceites y fideos",
    createdAt: new Date("2026-01-22"),
    productCount: 15,
  },
  {
    id: 3,
    name: "Bebidas",
    description: "Gaseosas, aguas y jugos",
    createdAt: new Date("2026-02-03"),
    productCount: 12,
  },
  {
    id: 4,
    name: "Limpieza",
    description: "Detergentes, lavandinas y suavizantes",
    createdAt: new Date("2026-02-14"),
    productCount: 6,
  },
  {
    id: 5,
    name: "Panadería",
    createdAt: new Date("2026-03-01"),
    productCount: 9,
  },
  {
    id: 6,
    name: "Snacks",
    description: "Papitas, galletitas y alfajores",
    createdAt: new Date("2026-03-18"),
    productCount: 0,
  },
];

export const Categories = () => {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [query, setQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [opened, { open: openModal, close }] = useDisclosure(false);

  const closeModal = () => {
    close();
    setEditingCategory(null);
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    openModal();
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    openModal();
  };

  const handleSave = ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    if (editingCategory) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name: name.trim(),
                description: description.trim() || undefined,
              }
            : category,
        ),
      );
      toast.success("Categoría actualizada correctamente");
    } else {
      const nextId =
        categories.length > 0
          ? Math.max(...categories.map((c) => c.id)) + 1
          : 1;
      setCategories((prevCategories) => [
        ...prevCategories,
        {
          id: nextId,
          name: name.trim(),
          description: description.trim() || undefined,
          createdAt: new Date(),
          productCount: 0,
        },
      ]);
      toast.success("Categoría creada correctamente");
    }
  };

  const handleAskDelete = (category: (typeof categories)[number]) => {
    if (category.productCount > 0) {
      toast.error("No se puede eliminar: hay productos en esta categoría");
      return;
    }
    setToDelete(category);
  };

  const handleConfirmDelete = () => {
    if (toDelete) {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== toDelete.id),
      );
      toast.success("Categoría eliminada");
    }
    setToDelete(null);
  };

  const queryToLower = query.trim().toLowerCase();
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(queryToLower),
  );

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        centered
        size="md"
        transitionProps={{ transition: "fade-down", duration: 300 }}
        withCloseButton={false}
      >
        <NewCategoryForm
          key={editingCategory?.id ?? "create"}
          category={editingCategory}
          categories={categories}
          onSave={handleSave}
          closeModal={closeModal}
        />
      </Modal>

      <ConfirmDialog
        opened={toDelete !== null}
        onClose={() => setToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar categoría?"
        description={`Se va a eliminar "${toDelete?.name ?? ""}".`}
        confirmLabel="Eliminar"
        destructive
      />

      <header className="border-border flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Categorías</h1>
          <p>{categories.length} categorías</p>
        </div>
        <Button
          leftSection={<Plus />}
          onClick={openCreateModal}
          className="bg-primary rounded-md p-2 text-white"
        >
          Nueva categoría
        </Button>
      </header>

      <main className="flex flex-col gap-6 p-6">
        <TextInput
          leftSection={<Search size={16} />}
          aria-label="Buscar categorías"
          placeholder="Buscar categoría"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          className="max-w-sm"
        />

        <CategoryList
          categories={filteredCategories}
          onEdit={openEditModal}
          onDelete={handleAskDelete}
        />
      </main>
    </>
  );
};
