import { FuelRecordDetails, type FuelRecord } from "../../../entities";

interface LastRecordProps {
  record: FuelRecord | null;
}

export const LastRecord = ({ record }: LastRecordProps) => {
  if (!record) {
    return <div>No records yet...</div>;
  }

  return <FuelRecordDetails record={record} />;
};
