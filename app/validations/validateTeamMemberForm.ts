import { Inputs } from "../types/common.types";

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  position?: string;
  yearsWorked?: string;
  image?: string;
  fileName?: string;
}

const validateTeamMemberForm = (inputs: Inputs, setErrors: any) => {
  const newErrors: ValidationErrors = {};

  // First Name validation
  if (!inputs?.firstName?.trim()) {
    newErrors.firstName = "First name is required";
  }

  // Last Name validation
  if (!inputs?.lastName?.trim()) {
    newErrors.lastName = "Last name is required";
  }

  // Position validation
  if (!inputs?.position?.trim()) {
    newErrors.position = "Position is required";
  }

  // Years Worked validation
  if (!inputs?.yearsWorked?.trim()) {
    newErrors.yearsWorked = "Years worked is required";
  }

  if (!inputs?.url) {
    if (!inputs?.image?.trim()) {
      newErrors.image = "Image is required";
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateTeamMemberForm;
