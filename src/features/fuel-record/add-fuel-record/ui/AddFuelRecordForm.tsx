import { Button, Input } from "../../../../shared";
import type { FormEvent } from "react";
import styles from "./styles.module.scss";

interface AddFuelRecordFormProps {
  onClose: () => void;
}

export const AddFuelRecordForm = ({ onClose }: AddFuelRecordFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const cancelForm = () => {
    // form?.reset();
    onClose();
  };
  return (
    <form id="addRecordForm" className={styles.form} onSubmit={handleSubmit}>
      <Input type="text" label="Total Mileage" />
      <Input type="text" label="Fuel volume" />
      <Input type="text" label="Fuel price" />
      <div className={styles.radio}>
        <label className={styles.radioItem}>
          <input
            type="radio"
            name="fullTank"
            id="fulltank"
            value="true"
            required
          />
          <span>Full tank</span>
        </label>
        <label className={styles.radioItem}>
          <input
            type="radio"
            name="fullTank"
            id="notFulltank"
            value="false"
            required
          />
          <span>Not full tank</span>
        </label>
      </div>
      <div className={styles.formAction}>
        <Button type="reset" variant="white" onClick={() => cancelForm()}>
          Cancel
        </Button>
        <Button shape="pill" variant="blue" type="submit">
          Save record
        </Button>
      </div>
    </form>
  );
};
