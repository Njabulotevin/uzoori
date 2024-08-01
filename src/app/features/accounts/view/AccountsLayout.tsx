import { Logo } from "@/components/Data/data";
import { SpinningWheel } from "@/components/SpinningWheel";
import React, { ReactNode, useContext } from "react";
import { useAtom } from "jotai";
import { loadingAtom } from "../../PopUp/stores/LoadingStore";

export default function AccountsLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const backgroundStyles = {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-20% 150%",
    backgroundSize: "70%",
  };
  const [isPending] = useAtom(loadingAtom);

  return (
    <div className="lg:flex relative">
      {isPending && (
        <div className="absolute w-full z-[3000] h-screen bg-violet-600/30  flex items-center justify-center text-white">
          <SpinningWheel />
        </div>
      )}
      <div className="flex lg:w-[60vw] flex-col gap-4 items-center px-auto pb-10">
        <div
          className="p-[20px] pt-[40px] max-w-[390px]"
          style={backgroundStyles}
        >
          <div className=" lg:max-w-[390px]  flex flex-col gap-4 items-center ">
            <div className=" w-[150px]  h-[80px] fill-violet-600 dark:fill-white ">
              <Logo />
            </div>

            <h4 className="font-semibold  lg:text-2xl dark:text-gray-100">
              {title}
            </h4>
            <p className="text-[12px] lg:text-base text-center font-medium text-gray-400">
              {subtitle}
            </p>
          </div>
        </div>
        <div className=" w-full lg:max-w-[390px] ">{children}</div>
        <p className="text-gray-400 text-sm text-[12px]">
          Copyright ©2023 uzoori. All rights reserved
        </p>
      </div>
      <div className="w-[40vw] hidden lg:flex min-h-screen bg-violet-600"></div>
    </div>
  );
}
