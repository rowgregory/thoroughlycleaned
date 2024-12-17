import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
} from "react";
import { Inputs } from "./common.types";

export interface ServiceFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  inputs: Inputs;
  setInputs: Dispatch<SetStateAction<Inputs>>;
  isCreate?: boolean;
}

export interface TestimonialFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  inputs: Inputs;
  isCreate?: boolean;
}

export interface RegisterFormProps {
  handleSubmit: (e: FormEvent) => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: ChangeEvent<HTMLInputElement>) => void;
  inputs: Inputs;
}

export interface FileInputProps {
  id: string;
  label: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

export interface DragAndDropUploaderProps {
  inputs: Inputs;
  setInputs: Dispatch<SetStateAction<Inputs>>;
}
