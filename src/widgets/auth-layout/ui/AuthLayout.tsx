import type { ReactNode } from "react";
import styles from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

export const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
