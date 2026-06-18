import React from "react";

import styles from "./styles.module.scss";

interface OverlayProps {
  children: React.ReactNode;
}

export const Overlay = ({ children }: OverlayProps) => (
  <div className={styles.overlay}>{children}</div>
);
