import React, { useEffect } from "react";
import { Overlay } from "./ModalOverlay/ModalOverlay";
import { ModalContainer, type ModalContainerSize } from "./ModalContainer/ModalContainer";
import { ModalHeader } from "./ModalHeader/ModalHeader";
import styles from "./styles.module.scss";

interface Modalprops {
  isOpen: boolean;
  size?: ModalContainerSize;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}
export const Modal = ({
  isOpen,
  title,
  size = "medium",
  children,
  onClose,
}: Modalprops) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay>
      <div className={styles.backdrop} onClick={handleOverlayClick}>
        <ModalContainer size={size}>
          <ModalHeader title={title} onClose={onClose} />
          {children}
        </ModalContainer>
      </div>
    </Overlay>
  );
};
