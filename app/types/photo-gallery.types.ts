import { ChangeEvent, FormEvent } from "react";
import { ServiceType } from "./service.types";
import { Inputs } from "./common.types";

export interface ProjectProps {
  id: string;
  galleryItems: any[];
  serviceType: ServiceType;
  name: string;
  updatedAt: string;
  isLoading: boolean;
}

export interface AdminGalleryDetailsFormProps {
  handleSubmit: (event: FormEvent) => void; // Handles form submission
  isUpdating: boolean; // Indicates if the form is in updating state
  handleInput: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // Handles input changes
  inputs: Record<string, any>; // Object containing input values
  submitted: boolean; // Indicates if the form has been submitted
  handleSelect: (value: string | number | any) => void; // Handles selection (e.g., dropdowns)
  errors: Record<string, string | null>; // Object containing validation errors
  reset: (event: FormEvent) => void; // Resets the form
  loading: boolean; // Indicates loading state
  handleOpenGalleryPhotosModal?: () => void; // Opens the gallery photos modal
  error: string;
}

export interface PhotoDropZoneProps {
  setInputs: (inputs: Inputs) => void;
  inputRef: any;
  url: string;
  name: string;
  role: string;
}
