import { useLocation } from "react-router-dom";
import styles from "./AppHeader.module.scss";
import { pathNames } from "../model/pathNames";

export const AppHeader = () => {
  const location = useLocation().pathname;
  const title = pathNames[location]
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>AL</span>
        <h1 className={styles.title}>{title}</h1>
      </div>
      
      <button className={styles.logoutButton} type="button">
        Logout
      </button>
    </header>
  );
};
