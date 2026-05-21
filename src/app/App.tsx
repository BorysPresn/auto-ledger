import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { AppHeader, Sidebar } from "../widgets";
import styles from "./App.module.scss";

export const App = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <div className={styles.shell}>
        <Sidebar />
        <main className={styles.main}>
          <AppRouter />
        </main>
      </div>
    </BrowserRouter>
  );
};
