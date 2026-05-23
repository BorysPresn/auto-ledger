import styles from "./AppHeader.module.scss";

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>AL</span>
      <h1 className={styles.title}>Auto Ledger</h1>
      <button className={styles.logoutButton} type="button">
        Logout
      </button>
    </header>
  );
};
