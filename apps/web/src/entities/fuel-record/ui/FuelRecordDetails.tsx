import type { FuelRecord } from "../model/types";
import styles from "./FuelRecordDetails.module.scss";

interface FuelRecordDetailsProps {
  record: FuelRecord;
}

export const FuelRecordDetails = ({ record }: FuelRecordDetailsProps) => {
  const items = [
    {
      key: "fuelConsumption",
      label: "Fuel consumption",
      value: record.fuelConsumption,
      suffix: " l/100km",
    },
    {
      key: "fullTank",
      label: "Full tank",
      value: record.fullTank ? "Yes" : "No",
    },
    {
      key: "totalMileage",
      label: "Total Mileage",
      value: record.totalMileage,
      suffix: " km",
    },
    {
      key: "fuelPrice",
      label: "Fuel Price",
      value: record.fuelPrice,
      suffix: " zl/l",
    },
    {
      key: "fuelVolume",
      label: "Fuel tanked",
      value: record.fuelVolume,
      suffix: " L",
    },
    {
      key: "distance",
      label: "Distance",
      value: record.distance,
      suffix: " km",
    },
    {
      key: "moneySpent",
      label: "Fuel cost",
      value: record.moneySpent,
      suffix: " zl",
    },
  ];

  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const unit = item.suffix ?? "";
        return (
          <li key={item.key} className={styles.item}>
            <p className={styles.label}>{item.label}</p>
            <p className={styles.value}>
              <b>{item.value}</b>
              {unit}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
