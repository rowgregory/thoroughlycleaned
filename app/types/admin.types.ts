import { Errors, Inputs } from "./common.types";

export interface AdminProfileInputProps {
  containerStyles?: string; // CSS styles for the container, optional
  name: string; // Name of the input field
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void; // Input handler function
  label: string; // Label text for the input
  submitted: boolean; // Indicates if the form has been submitted
  value: string | number; // Current value of the input field
  error?: string; // Error message, optional
}

export interface ApprovedUserCardProps {
  id: string;
  name: string;
  phoneNumber: string;
  colorCode: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface AdminTestimonialFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  reset: () => void;
  isUpdating: boolean;
  handleInput: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  inputs: Inputs;
  submitted: boolean;
  errors: Errors;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean;
  error: string;
}
