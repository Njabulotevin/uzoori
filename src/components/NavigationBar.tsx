import { getAuth } from "@/scripts/utils";
import Link from "next/link";
import React, { ReactNode } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { Logo } from "./Data/data";

export default function NavigationBar({ children }: { children: ReactNode }) {
  return (
    <div className="w-full px-[20px] h-[70px] py-[18px] min-w-[342px] bg-white dark:bg-darkMode-900 border-b  dark:border-darkMode-500  ">
      <div className="flex justify-between">{children}</div>
    </div>
  );
}
