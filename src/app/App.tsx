import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { AppHeader, Sidebar } from "../widgets";
import styles from "./App.module.scss";
import { useState } from "react";
import { Modal } from "../shared";
import { AddFuelRecordForm } from "../features/fuel-record/add-fuel-record";

export const App = () => {
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] =
    useState(false);
  const handleAddRecordModalOpen = () => {
    setIsAddRecordModalOpen(true);
  };
  const handleAddRecordModalClose = () => {
    setIsAddRecordModalOpen(false);
  };
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};
