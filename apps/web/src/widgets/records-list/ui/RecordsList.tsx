import { FuelRecordDetails, type FuelRecord } from "../../../entities";
import { Icon } from "../../../shared";
import styles from "./RecordsList.module.scss";

interface RecordsListProps {
  records: FuelRecord[];
}

export const RecordsList = ({ records }: RecordsListProps) => {
  if (records.length === 0) {
    return (
      <p className={styles.empty}>
        <Icon name="tasks" />
        No fuel records yet
      </p>
    );
  }

  return (
    <ul className={styles.recordsList}>
      {records.map((record) => (
        <li key={record.createdAt} className={styles.recordsCard}>
          <FuelRecordDetails record={record} />
        </li>
      ))}
    </ul>
  );
};
