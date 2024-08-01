import React, { useRef } from "react";
import { BsXLg } from "react-icons/bs";
import useBottomToast from "../hooks/useBottomToast";

export default function BottomToast() {
  const { closeToast, toastText } = useBottomToast();

  return (
    <div className="fixed bottom-[10vh] lg:bottom-[5vh] left-0 z-[1000] w-[100vw] flex justify-center animate__animated animate__slideInUp  animate__faster">
      <div className="dark:bg-gray-900  bg-violet-600 text-xs lg:text-sm flex items-center gap-5 font-semibold  shadow-lg  text-gray-100 rounded p-3 px-10 ">
        <p>{toastText}</p>
        <BsXLg
          onClick={() => {
            closeToast();
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
