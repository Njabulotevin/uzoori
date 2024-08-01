import React, { useContext } from "react";
import { useAtom } from "jotai";
import { isToastOnAtom, toastAtom } from "../stores/ToastStore";

export default function useToast() {
  const [toast, setToast] = useAtom(toastAtom);
  const [toggleToast, setToggleToast] = useAtom(isToastOnAtom);

  const closeToast = () => {
    setToggleToast(false);
  };

  const openToast = () => {
    setToggleToast(true);

    setTimeout(() => {
      closeToast()
    }, 4000);
  };

  return {
    toast,
    setToast,
    closeToast,
    toggleToast,
    openToast,
  };
}
