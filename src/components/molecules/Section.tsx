import React , { ReactNode } from "react";

export default function Section({
    children,
    title,
    number
  }: {
    children?: ReactNode;
    title?: string;
    number ?: ReactNode
  }) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">{number&&<div className=" flex items-center font-medium justify-center bg-violet-600 text-white text-p4 rounded-full w-[20px] h-[20px]">{number}</div>} <h4 className="text-violet-600 font-medium text-p2">{title}</h4></div>
        <div className="">{children}</div>
      </div>
    );
  }