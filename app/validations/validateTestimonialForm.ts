import { Inputs } from "../types/common.types";

interface ValidationErrors {
  name?: string;
  review?: string;
  reviewTitle?: string;
}

const validateTestimonialForm = (inputs: Inputs, setErrors: any) => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.name?.trim()) {
    newErrors.name = "Name is required";
  }
  if (!inputs?.review?.trim()) {
    newErrors.review = "Review is required";
  }
  if (!inputs?.reviewTitle?.trim()) {
    newErrors.reviewTitle = "Review title is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateTestimonialForm;
