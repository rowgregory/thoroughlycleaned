import {
  ChangeEvent,
  Dispatch,
  LegacyRef,
  ReactNode,
  SetStateAction,
} from "react";

interface VideoProps {
  videoRef: LegacyRef<HTMLVideoElement>;
  src: string;
  className: string;
}

interface BannerProps {
  src: string;
  title: string;
  breadcrumb: string;
}

interface ChildrenProps {
  children: ReactNode;
}

type Inputs = {
  [key: string]: string | number | boolean | undefined;
};

type Errors = {
  [key: string]: string;
};

type UseFormHook = {
  inputs: Inputs;
  errors: Errors;
  handleInput: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleToggle: (event: ChangeEvent<HTMLInputElement>) => void;
  setInputs: Dispatch<SetStateAction<Inputs>>;
  setErrors: Dispatch<SetStateAction<Errors>>;
};

export type {
  VideoProps,
  BannerProps,
  ChildrenProps,
  Inputs,
  Errors,
  UseFormHook,
};
