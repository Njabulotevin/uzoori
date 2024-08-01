import React from "react";
import { BsCheck2Circle, BsCheckCircle, BsXCircle, BsXCircleFill } from "react-icons/bs";

export default function Alert({
  type,
  message,
}: {
  type: string;
  message?: string;
}) {
  switch (type) {
    case "warning":
      return (
        <div className="text-p2 p-5 rounded">
          <BsXCircleFill />
          <span>{message}</span>
        </div>
      );
    case "success":
      return (
        <div className="text-p2 p-5 text-green-900 bg-green-200 rounded flex gap-4">
          <BsCheckCircle size={30} />
          <div className="flex flex-col">
            <span className="font-semibold">Success</span>
            <span>{message}</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="text-p2 p-5 text-red-900 bg-red-200 rounded flex gap-4">
          <BsXCircle size={30} />
          <div className="flex flex-col">
            <span className="font-semibold">Something went wrong</span>
            <span>{message}</span>
          </div>
        </div>
      );
  }
}
