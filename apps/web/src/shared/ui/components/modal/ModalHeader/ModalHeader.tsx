import { Button } from "../../button";
import styles from "./ModalHeader.module.scss";

interface ModalHeaderProps {
  title?: string;
  onClose: () => void;
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className={styles.header}>
      {title && <h3>{title}</h3>}
      <Button
        icon="modalClose"
        shape="modal"
        variant="white"
        aria-label="Close"
        onClick={onClose}
      />
    </div>
  );
};
