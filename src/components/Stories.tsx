import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsX, BsXLg } from "react-icons/bs";
import Story from "./molecules/Story";

export default function Stories() {
  const [displayOn, setDisplayOn] = useState(false);

  const [displayActiveData, setDisplayActiveData] = useState("");

  const Router = useRouter();
  const images = [
    { name: "Best Styles", imgSrc: "braid1.jpg" },
    { name: "Best Styles", imgSrc: "braid2.jpg" },
    { name: "Best Styles", imgSrc: "braid3.jpg" },
    { name: "Best Styles", imgSrc: "braid4.jpg" },
  ];
  return (
    <div className="flex gap-[14px] justify-center lg:justify-start lg:gap-10 overflow-hidden w-full">
      {images.map((item, i) => {
        return (
          <div
            className="shrink-0"
            key={i}
            onClick={() => {
              Router.push(`/story_view/${i + 1}`);
            }}
          >
            <Story key={i} imgSrc={item.imgSrc} name={item.name} />
          </div>
        );
      })}
    </div>
  );
}
