import { mockFuelRecords } from "../../../entities";
import { RecordsList } from "../../../widgets";



export const HistoryPage = () => {
    return (
        <div>
            <RecordsList records={mockFuelRecords}/>
        </div>
    );
};