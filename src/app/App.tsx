import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { AppHeader, Sidebar } from "../widgets";
import styles from "./App.module.scss";
import { useState } from "react";
import { Modal } from "../shared";
import { AddFuelRecordForm } from "../features/fuel-record/add-fuel-record";

export const App = () => {
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] =
    useState<boolean>(false);
  const handleAddRecordModalOpen = () => {
    setIsAddRecordModalOpen(true);
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
        size={"medium"}
        onClose={() => {
          setIsAddRecordModalOpen(false);
        }}
        title="Add record"
      >
        <AddFuelRecordForm
          onClose={() => {
            setIsAddRecordModalOpen(false);
          }}
        />
      </Modal>
    </BrowserRouter>
  );
};
