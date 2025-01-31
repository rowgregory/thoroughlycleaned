import { Inputs } from "../types/common.types";

interface ValidationErrors {
  code?: string;
}

const validateVerifyCodeForm = (inputs: Inputs, setErrors: any) => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.code?.trim()) {
    newErrors.code = "Code is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateVerifyCodeForm;
