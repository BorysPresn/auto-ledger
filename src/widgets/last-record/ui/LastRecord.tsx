import { FuelRecordDetails, type FuelRecord } from "../../../entities";
import styles from "./LastRecord.module.scss";

interface LastRecordProps {
  record: FuelRecord | null;
}

export const LastRecord = ({ record }: LastRecordProps) => {
  if (!record) {
    return <div className={styles.card}>No records yet...</div>;
  }

  const recordDate = Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(record.createdAt);

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <h4>Last Record</h4>
        <span>{recordDate}</span>
      </div>
      <hr />
      <FuelRecordDetails record={record} />
    </div>
  );
};
