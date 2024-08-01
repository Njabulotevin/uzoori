import { useAtom } from "jotai";
import React from "react";
import { bottomToastTextAtom, isBottomToastOnAtom } from "../stores/ToastStore";

export default function useBottomToast() {
  const [isToastOn, setIsToastOn] = useAtom(isBottomToastOnAtom);
  const [toastText, setToastText] = useAtom(bottomToastTextAtom);

  const openBottomToast = (text: string) => {
    setToastText(text);
    setIsToastOn(true);
    setTimeout(() => {
      setIsToastOn(false);
    }, 3000);
  };

  const closeToast = () => {
    setIsToastOn(false);
  };

  return { isToastOn, openBottomToast, closeToast, toastText };
}
