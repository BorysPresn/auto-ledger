export interface AddFuelRecordFormProps {
  onClose: () => void;
}
export type AddFuelRecordFormValues = {
  totalMileage: string;
  fuelVolume: string;
  fuelPrice: string;
  fullTank: "true" | "false" | "";
};