import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { BsChevronLeft, BsChevronUp } from "react-icons/bs";
import SalonCover from "./SalonCover";
import UserName from "./UserName";

export default function SubPageLayout({ children }: { children?: ReactNode }) {
  const Router = useRouter();
  const customShadow = {
    boxShadow: "1px -5px 4px rgba(0, 0, 0, 0.25)",
  };

  const backgroundStyle = {
    backgroundSize: "150%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const OverlayBackground = {
    background:
      "linear-gradient(180deg, rgba(0,0,0,1) 5%, rgba(255,255,255,0) 100%)",
  };

  return (
    <div className="relative">
      <div className="w-full relative">
        <div
          style={customShadow}
          className="bg-white relative p-[20px]  z-40 w-full top-[112px] rounded-2xl  h-[100vh]"
        >
          {/* content start */}

          <div className="mt-[10px] flex flex-col gap-[30px] pb-10">
            {children}
          </div>

          {/* content end */}
        </div>
        <div className="absolute top-0">
          <div
            style={backgroundStyle}
            className='bg-[url("/salon.jpg")] min-w-[360px] w-[100vw] h-[460px] relative'
          >
            <div
              className="w-full min-w-[360px] h-[320px] absolute top-0 "
              style={OverlayBackground}
            ></div>
            <div className="flex justify-between relative z-40 p-[25px]">
              <UserName
                imgSrc={""}
                name="Best Styles"
                textSize="text-h5 text-white"
                userName={""}
                type={"general"}
                isVerified={false}
              >
                <h4 className="text-neutral-200 text-p3">@username</h4>
              </UserName>
              <div
                className="w-[24px] h-[24px]"
                onClick={() => {
                  Router.back();
                }}
              >
                <BsChevronUp className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
