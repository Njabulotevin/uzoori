import React from "react";
import { BsCheckCircleFill, BsXCircleFill, BsXLg } from "react-icons/bs";
import useToast from "../hooks/useToast";

export default function Toast() {
  const { toast, closeToast } = useToast();
  return (
    <div
      className={`box-small ${
        toast.type === "SUCCESS" ? "bg-green-50" : "bg-red-50"
      } dark:bg-slate-800`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          {toast.type === "SUCCESS" ? (
            <BsCheckCircleFill size={40} className="text-green-500" />
          ) : (
            <BsXCircleFill size={40} className="text-red-500" />
          )}
          <div
            className={`text-md font-medium ${
              toast.type === "SUCCESS"
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
            }`}
          >
            {toast.message}
          </div>
        </div>
        <button onClick={() => closeToast()} className="text-gray-400">
          <BsXLg />
        </button>
      </div>
    </div>
  );
}
