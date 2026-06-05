import { mockFuelRecords } from "../../../entities";
import { LastRecord } from "../../../widgets";

export const DashboardPage = () => {
  const lastRecord = mockFuelRecords.at(-1) ?? null;
  return (
    <div>
      <LastRecord record={lastRecord} />
    </div>
  );
};
