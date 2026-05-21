import type { FuelRecord } from "../model/types";

interface FuelRecordDetailsProps {
    record: FuelRecord
}

export const FuelRecordDetails = ({record}: FuelRecordDetailsProps) => {

    const date = new Date(record.createdAt).toLocaleString();
    const fullTank = record.fullTank ? "Yes" : "No";
    return (
        <div>
            <p>Date: <b>{date}</b></p>
            <p>Fuel tanked: <b>{record.fuelVolume}</b> L</p>
            <p>Full tank: {fullTank}</p>
            <p>Fuel price: <b>{record.fuelPrice}</b> zl/l</p>
            <p>Fuel cost: <b>{record.moneySpent}</b> zl</p>
            <p>Distance: <b>{record.distance}</b> km</p>
            <p>Total mileage: <b>{record.totalMileage}</b> km</p>
            <p>Fuel consumption: <b>{record.fuelConsumption}</b> l/100km</p>
        </div>
    );
};