import {
  ChangeEvent,
  Dispatch,
  LegacyRef,
  MouseEvent,
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

interface PageWrapperProps {
  children: ReactNode;
  isLoggedIn: boolean;
}

type Inputs = {
  [key: string]: string | number | boolean | undefined | any;
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

interface RowProps {
  data: {} | any;
  onDelete: (e: MouseEvent<HTMLSpanElement>, id: number) => void;
  filteredArray: {}[];
  i: number;
}

interface ServerWrapperProps {
  params: Promise<{ id: string }>;
}

export type {
  VideoProps,
  BannerProps,
  ChildrenProps,
  Inputs,
  Errors,
  UseFormHook,
  RowProps,
  ServerWrapperProps,
  PageWrapperProps,
};
