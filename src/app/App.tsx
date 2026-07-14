import { AppRouter } from "./router";
import { AppHeader, Sidebar } from "../widgets";
import styles from "./App.module.scss";
import { useState } from "react";
import { Modal } from "../shared";
import { AddFuelRecordForm } from "../features/fuel-record/add-fuel-record";
import { useLocation } from "react-router-dom";

export const App = () => {
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);

  const handleAddRecordModalOpen = () => {
    setIsAddRecordModalOpen(true);
  };
  const handleAddRecordModalClose = () => {
    setIsAddRecordModalOpen(false);
  };

  const location = useLocation();
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.includes(location.pathname);

  if (isAuthRoute) {
    return <AppRouter />;
  }

  return (
    <>
      <AppHeader openModal={handleAddRecordModalOpen} />
      <div className={styles.shell}>
        <Sidebar />
        <main className={styles.main}>
          <AppRouter />
        </main>
      </div>
      <Modal
        isOpen={isAddRecordModalOpen}
        size="medium"
        onClose={handleAddRecordModalClose}
        title="Add record"
      >
        <AddFuelRecordForm onClose={handleAddRecordModalClose} />
      </Modal>
    </>
  );
};
