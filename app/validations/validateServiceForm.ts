import { Inputs } from "../types/common.types";

interface ValidationErrors {
  name?: string;
  image?: string;
  description?: string;
}

const validateServiceForm = (inputs: Inputs, setErrors: any) => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.name?.trim()) {
    newErrors.name = "Name is required";
  }
  if (!inputs?.image?.trim()) {
    newErrors.image = "Image is required";
  }
  if (!inputs?.description?.trim()) {
    newErrors.description = "Description is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateServiceForm;
