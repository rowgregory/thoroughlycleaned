import { Inputs } from "../types/common.types";

interface ValidationErrors {
  image?: string;
}

const validatePhotoGalleryImageForm = (inputs: Inputs, setErrors: any) => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.image?.trim()) {
    newErrors.image = "Image is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validatePhotoGalleryImageForm;
