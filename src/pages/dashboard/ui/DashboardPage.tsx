import { mockFuelRecords } from "../../../entities";
import { LastRecord } from "../../../widgets";



export const DashboardPage = () => {
    const lastRecord = mockFuelRecords.at(-1) ?? null;
    return (
        <div>
            <h2>Dashboard page</h2>
            <LastRecord record={lastRecord} />
        </div>
    );
};