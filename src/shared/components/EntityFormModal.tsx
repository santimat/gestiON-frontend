import { Fragment, type ReactNode } from "react";
import { Modal, type ModalProps } from "@mantine/core";

type EntityFormModalProps = {
  opened: boolean;
  closeModal: () => void;
  entityKey: string | number;
  size?: ModalProps["size"];
  children: ReactNode;
};

// modal reutilizable para el form de las entidades
export const EntityFormModal = ({
  opened,
  closeModal,
  entityKey,
  size = "xl",
  children,
}: EntityFormModalProps) => (
  <Modal
    opened={opened}
    onClose={closeModal}
    centered
    size={size}
    transitionProps={{ transition: "fade-down", duration: 300 }}
    withCloseButton={false}
  >
    <Fragment key={entityKey}>{children}</Fragment>
  </Modal>
);
