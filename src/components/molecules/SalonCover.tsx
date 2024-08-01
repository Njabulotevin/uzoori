import { useRouter } from "next/navigation";
import React from "react";
import { BsChevronLeft } from "react-icons/bs";

export default function SalonCover() {
  const Router = useRouter();
  const backgroundStyle = {
    backgroundSize: "150%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const OverlayBackground = {
    background:
      "linear-gradient(180deg, rgba(0,0,0,1) 17%, rgba(255,255,255,0) 100%)",
  };

  return (
    <div
      style={backgroundStyle}
      className='bg-[url("/salon1.jpg")] w-[100vw] h-[460px] relative min-w-[360px]'
    >
      <div
        className="w-full min-w-[320px] h-[320px] absolute top-0 "
        style={OverlayBackground}
      ></div>
      <div className="flex justify-between relative z-40 p-[25px] min-w-[360px]">
        <div
          className="w-[24px] h-[24px]"
          onClick={() => {
            Router.back();
          }}
        >
          <BsChevronLeft className="text-white" size={24} />
        </div>
        <div className="bg-violet-600 py-[3px] px-[6px] rounded">
          <h4 className="text-p1 text-white">OPEN</h4>
        </div>
      </div>
    </div>
  );
}
