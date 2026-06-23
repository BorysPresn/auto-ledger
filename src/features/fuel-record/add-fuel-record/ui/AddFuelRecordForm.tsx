import clsx from "clsx";
import { Button, Input } from "../../../../shared";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import type {
  AddFuelRecordFormProps,
  AddFuelRecordFormValues,
} from "../model/types";
import {
  checkIsPositiveNumber,
  createTotalMileageValidator,
} from "../model/validators";
import { mockFuelRecords } from "../../../../entities";

export const AddFuelRecordForm = ({ onClose }: AddFuelRecordFormProps) => {
  const { register, handleSubmit, reset, formState } =
    useForm<AddFuelRecordFormValues>({
      defaultValues: {
        totalMileage: "",
        fuelVolume: "",
        fuelPrice: "",
        fullTank: "",
      },
    });
  const errors = formState.errors;
  const latestRecordMileage =
    mockFuelRecords[mockFuelRecords.length - 1]?.totalMileage;
  const validateTotalMileage = createTotalMileageValidator(latestRecordMileage);

  const formSubmit = (data: AddFuelRecordFormValues) => {
    console.log(data);
    reset();
    onClose();
  };

  const cancelForm = () => {
    reset();
    onClose();
  };
  return (
    <form
      id="addRecordForm"
      className={styles.form}
      onSubmit={handleSubmit(formSubmit)}
    >
      <Input
        type="text"
        label="Total Mileage"
        {...register("totalMileage", {
          required: "Total mileage is required",
          validate: validateTotalMileage,
        })}
        error={errors.totalMileage?.message}
      />
      <Input
        type="text"
        label="Fuel volume"
        {...register("fuelVolume", {
          required: "Fuel volume is required",
          validate: checkIsPositiveNumber,
        })}
        error={errors.fuelVolume?.message}
      />
      <Input
        type="text"
        label="Fuel price"
        {...register("fuelPrice", {
          required: "Fuel price is required",
          validate: checkIsPositiveNumber,
        })}
        error={errors.fuelPrice?.message}
      />
      <div className={styles.radio}>
        <label
          className={clsx(
            styles.radioItem,
            errors.fullTank && styles.radioItemError,
          )}
        >
          <input
            type="radio"
            id="fulltank"
            value="true"
            {...register("fullTank", {
              required: "Choose one of these options",
            })}
          />
          <span>Full tank</span>
        </label>
        <label
          className={clsx(
            styles.radioItem,
            errors.fullTank && styles.radioItemError,
          )}
        >
          <input
            type="radio"
            id="notFullTank"
            value="false"
            {...register("fullTank", {
              required: "Choose one of these options",
            })}
          />
          <span>Not full tank</span>
        </label>
        <p className={clsx(styles.error, errors.fullTank && styles.showError)}>
          {errors.fullTank?.message}
        </p>
      </div>
      <div className={styles.formAction}>
        <Button type="reset" variant="white" onClick={cancelForm}>
          Cancel
        </Button>
        <Button shape="pill" variant="blue" type="submit">
          Save record
        </Button>
      </div>
    </form>
  );
};
