import { ReactNode } from "react";

export type inputType = {
  placeholder: string;
  label: string;
  name: string;
  type:
    | "text"
    | "price"
    | "phoneNumber"
    | "textarea"
    | "dropdown"
    | "switch"
    | "number";
  value: unknown;
  gridSpan?: string;
  iconConfig?: {
    icon: ReactNode;
    position: "left" | "right";
    onClick: Function;
  };
  options?: string[];
};
