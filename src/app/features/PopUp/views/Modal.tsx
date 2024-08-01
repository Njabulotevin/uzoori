import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React, { useContext } from "react";
import useModal from "../hooks/useModal";
import Button from "@/components/molecules/Button";
import { BsXLg } from "react-icons/bs";

export default function WarningModal() {
  const { modal, closeModal } = useModal();

  return (
    <div className="bg-gray-700/60 dark:bg-slate-500/60 w-full h-screen flex items-end lg:items-center justify-center">
      <div className="bg-white dark:bg-darkMode-900 border  dark:border-gray-500 w-full lg:w-auto shadow-md min-w-[360px] lg:rounded-[14px] flex flex-col gap-9 px-5 lg:px-10 p-10 max-h-[95vh] lg:max-h-[98vh]">
        <div className="flex justify-between ">
          <div className="flex flex-col gap-2">
            {modal.title && (
              <h4 className="lg:text-lg text-slate-700 dark:text-slate-200 font-semibold">
                {modal.title}
              </h4>
            )}
            {modal.subtitle && (
              <p className="lg:text-base font-semibold text-gray-400">
                {modal.subtitle}
              </p>
            )}
          </div>
          <div
            onClick={() => closeModal()}
            className="border border-gray-200 rounded-[14px] w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <span className="text-slate-700 dark:text-slate-200">
              <BsXLg />
            </span>
          </div>
        </div>
        <div className="overflow-x-auto ">{modal.modalChild}</div>
      </div>
    </div>
  );
}

export function ChangePasswordWarning() {
  const { handleNegativeAction, handlePositiveAction } = useModal();

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-[100%] w-full max-w-[472px]">
      <h4 className="font-semibold text-2xl text-gray-700">Change Password</h4>
      <p className="font-medium text-base text-gray-400 text-center">
        Are you sure you want to change your password? you will need to use your
        new password to access your account.
      </p>
      <div className="flex gap-5 justify-center">
        <Button
          size={"default"}
          variant={"secondary"}
          onClick={handleNegativeAction}
        >
          Cancel
        </Button>
        <Button
          size={"default"}
          variant={"primary"}
          onClick={handlePositiveAction}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
