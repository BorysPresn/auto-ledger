import React from "react";

import styles from "./ModalOverlay.module.scss";

interface OverlayProps {
  children: React.ReactNode;
}

export const Overlay = ({ children }: OverlayProps) => (
  <div className={styles.overlay}>{children}</div>
);
