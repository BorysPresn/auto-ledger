import { FuelRecordDetails, type FuelRecord } from "../../../entities";

interface RecordsListProps {
  records: FuelRecord[];
}

export const RecordsList = ({ records }: RecordsListProps) => {
  return (
    <ul>
      {records.length !== 0
        ? records.map((record) => (
            <li key={record.createdAt}>
              <FuelRecordDetails record={record} />
            </li>
          ))
        : "No records yet..."}
    </ul>
  );
};
