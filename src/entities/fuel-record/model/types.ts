export type FuelRecordFormValues = {
  fullTank: boolean;
  totalMileage: number;
  fuelPrice: number;
  fuelVolume: number;
};
export type FuelRecord = FuelRecordFormValues & {
  createdAt: number;
  distance: number;
  moneySpent: number;
  fuelConsumption: number;
};
