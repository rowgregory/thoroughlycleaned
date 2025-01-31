import { Inputs } from "../types/common.types";

interface ValidationErrors {
  name?: string;
  serviceType?: string;
}

const validatePhotoGalleryProjectForm = (inputs: Inputs, setErrors: any) => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.name?.trim()) {
    newErrors.name = "Project title is required";
  }
  if (!inputs?.serviceType?.trim()) {
    newErrors.name = "Service type is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validatePhotoGalleryProjectForm;
