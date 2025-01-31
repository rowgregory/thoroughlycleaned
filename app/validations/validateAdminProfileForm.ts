import { Inputs } from "../types/common.types";

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

const validateAdminProfileForm = (inputs: Inputs, setErrors: any) => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.firstName?.trim()) {
    newErrors.firstName = "First name is required";
  }

  if (!inputs?.lastName?.trim()) {
    newErrors.lastName = "Last name is required";
  }

  if (!inputs.phoneNumber?.trim()) {
    newErrors.phoneNumber = "Phone Number is required";
  } else if (!/^\d{10}$/.test(inputs.phoneNumber)) {
    newErrors.phoneNumber = "Phone Number must be 10 digits";
  }

  if (!inputs.email?.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email)
  ) {
    newErrors.email = "Invalid email format";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateAdminProfileForm;
