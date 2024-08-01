import React, { ReactNode, useContext } from "react";
import { useAtom } from "jotai";
import { Imodal, isModalOnAtom, modalAtom } from "../stores/ModalStore";

export interface modalChild {
  modalChild: ReactNode;
  title: string;
  subtitle: string;
  action: Function;
}

export default function useModal() {
  const [modal, setModal] = useAtom(modalAtom);
  const [isModalOn, setIsModalOn] = useAtom(isModalOnAtom);

  const handlePositiveAction = () => {
    modal.action();
    closeModal();
    console.log("closed with confirmation to perform action...");
  };
  const handleNegativeAction = () => {
    closeModal();
    console.log("closed but does not perform action...");
  };

  const closeModal = () => {
    setModal({
      modalChild: <div></div>,
      title: "",
      subtitle: "",
      action: () => {},
    });
    setIsModalOn(false);
    document.body.style.overflow = "auto";
  };

  const openModal = (details: Imodal) => {
    setModal(details as Imodal);
    setIsModalOn(true);
    document.body.style.overflow = "hidden";
  };

  return {
    handleNegativeAction,
    handlePositiveAction,
    setModal,
    modal,
    closeModal,
    openModal,
    isModalOn,
    setIsModalOn,
  };
}
