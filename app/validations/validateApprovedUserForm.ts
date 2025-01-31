import { Inputs } from "../types/common.types";

interface ValidationErrors {
  name?: string;
  phoneNumber?: string;
}

const validateApprovedUserForm = (inputs: Inputs, setErrors: any) => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.name?.trim()) {
    newErrors.name = "Name is required";
  }

  if (!inputs.phoneNumber?.trim()) {
    newErrors.phoneNumber = "Phone Number is required";
  } else if (!/^\d{10}$/.test(inputs.phoneNumber)) {
    newErrors.phoneNumber =
      "Phone Number must be 10 digits, no spaces or characters";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateApprovedUserForm;
