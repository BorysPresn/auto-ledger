import React from "react";

import clsx from "clsx";

import styles from "./ModalContainer.module.scss";

export type ModalContainerSize = "small" | "medium" | "large";

interface ModalContainerProps {
  size: ModalContainerSize;
  children: React.ReactNode;
}

export const ModalContainer = ({ children, size }: ModalContainerProps) => (
  <div className={clsx(styles.container, styles[size])} role="dialog" aria-modal="true">
    {children}
  </div>
);
