export const createTotalMileageValidator = (prevMileage: number) => {
  return (v: string) => {
    const isPositiveNumber = checkIsPositiveNumber(v);
    if (isPositiveNumber !== true) return isPositiveNumber;

    if (Number(v) <= prevMileage) {
      return `Mileage must be greater than last record (${prevMileage})`;
    }
    return true;
  };
};

export const checkIsPositiveNumber = (v: string) => {
  const value = Number(v.trim());
  if (!Number.isNaN(value) && value > 0) {
    return true;
  }
  return "Only positive numbers are allowed";
};
