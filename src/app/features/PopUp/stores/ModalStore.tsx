import { atom } from "jotai";
import { ReactElement } from "react";

export type Imodal = {
  modalChild: ReactElement;
  title: string;
  subtitle: string;
  action: () => void;
};

export const modalAtom = atom<Imodal>({
  modalChild: <div></div>,
  title: "",
  subtitle: "",
  action: () => {},
});

export const isModalOnAtom = atom<boolean>(false);
