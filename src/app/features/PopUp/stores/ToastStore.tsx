import { atom } from "jotai";
import { ReactElement } from "react";

interface Itoast {
  modalChild: ReactElement;
  type: "SUCCESS" | "ERROR";
  message: string;
}

export const toastAtom = atom<Itoast>({
  modalChild: <div></div>,
  type: "SUCCESS" as "SUCCESS" | "ERROR",
  message: "",
});

export const isToastOnAtom = atom<boolean>(false);
export const isBottomToastOnAtom = atom<boolean>(false);
export const bottomToastTextAtom = atom<string>("");
