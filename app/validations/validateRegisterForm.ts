import { Inputs } from "../types/common.types";

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  consentToSMS?: string;
}

const validateRegisterForm = (inputs: Inputs, setErrors: any) => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.firstName?.trim()) {
    newErrors.firstName = "First Name is required";
  }

  if (!inputs?.lastName?.trim()) {
    newErrors.lastName = "Last Name is required";
  }

  if (!inputs?.phoneNumber?.trim()) {
    newErrors.phoneNumber = "Phone Number is required";
  } else if (!/^\d{10}$/.test(inputs?.phoneNumber)) {
    newErrors.phoneNumber = "Phone Number must be 10 digits";
  }

  if (!inputs?.consentToSMS) {
    newErrors.consentToSMS = "You must consent to SMS communication";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // return true if no errors
};

export default validateRegisterForm;
