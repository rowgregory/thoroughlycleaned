import { Inputs } from "../types/common.types";

interface ValidationErrors {
  code?: string;
}

const validateLoginCodeForm = (inputs: Inputs, setErrors: any) => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.code?.trim()) {
    newErrors.code = "Phone Number is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateLoginCodeForm;
