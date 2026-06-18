import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { AppHeader, Sidebar } from "../widgets";
import styles from "./App.module.scss";
import { useState } from "react";
import { Modal } from "../shared";

export const App = () => {
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState<boolean>(false);
  const handleModal = () => {
    setIsAddRecordModalOpen(true);
  };

  return (
    <BrowserRouter>
      <AppHeader openModal={handleModal} />
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
        Add new record form will be here
      </Modal>
    </BrowserRouter>
  );
};
