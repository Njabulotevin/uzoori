import clsx from "clsx";
import React, { ReactNode } from "react";

export type tab = {
  label: string;
  icon: ReactNode;
  id: string;
};

export default function TabCard({
  align,
  tabsList,
  setActiveTab,
  activeTab,
}: {
  align?: "center" | "start" | "end";
  tabsList: tab[];
  setActiveTab: (itme: tab) => void;
  activeTab: tab;
}) {
  return (
    <div className="border-b border-gray-200 dark:border-darkMode-300">
      <div
        style={{ width: "fit-content" }}
        className={clsx(
          "flex gap-4  rounded-md p-2 px-0 pb-0",
          align === "center" ? "justify-center mx-auto" : "justify-start"
        )}
      >
        {tabsList.map((item: tab, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setActiveTab(item);
              }}
              className={`${
                activeTab.id === item.id
                  ? "border-b-2 border-violet-600 "
                  : "border-b-2 border-darkMode-500"
              } text-sm text-gray-700 dark:text-gray-100 font-semibold cursor-pointer px-2 py-4 flex gap-2 items-center`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
