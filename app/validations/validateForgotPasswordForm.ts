import { Inputs } from "../types/common.types";

interface ValidationErrors {
  email?: string;
  phoneNumber?: string;
}

const validateForgotPasswordForm = (
  inputs: Inputs,
  setErrors: any
): boolean => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.phoneNumber?.trim()) {
    newErrors.phoneNumber = "Phone Number is required";
  } else if (!/^\d{10}$/.test(inputs?.phoneNumber)) {
    newErrors.phoneNumber = "Phone Number must be 10 digits";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateForgotPasswordForm;
