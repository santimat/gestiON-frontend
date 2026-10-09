import { Button } from "@mantine/core";

type ModalActionsProps = {
  closeModal: () => void;
  sumbmitText: string;
};

export const ModalActions = ({
  closeModal,
  sumbmitText,
}: ModalActionsProps) => {
  return (
    <div className="flex justify-end gap-4 pt-6">
      <Button className="bg-destructive!" onClick={closeModal}>
        Cancelar
      </Button>
      <Button type="submit">{sumbmitText}</Button>
    </div>
  );
};
