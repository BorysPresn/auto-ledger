import { useLocation } from "react-router-dom";
import { appRouteMeta } from "../../../shared/config/routes";
import styles from "./AppHeader.module.scss";

export const AppHeader = () => {
  const { pathname } = useLocation();
  const currentRoute = appRouteMeta.find((route) => route.path === pathname);
  const title = currentRoute?.title ?? "Dashboard";

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>AL</span>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.rightSide}>
        <button className={styles.addButton} type="button">
          Add New +
        </button>
        <span className={styles.avatar}>IMG</span>
      </div>
    </header>
  );
};
