import { ModalHeader } from "@mantine/core";
import { ModalFormActions } from "../ModalFormActions";

type NewCategoryFormProps = {
  closeModal: () => void;
};

export const NewCategoryForm = ({ closeModal }: NewCategoryFormProps) => {
  return (
    <>
      <ModalHeader title="Nueva categoría" />
      <form>
        <ModalFormActions
          closeModal={closeModal}
          sumbmitText="Nueva categoría"
        />
      </form>
    </>
  );
};
