import React from "react";

export default function Story({imgSrc, name} : {imgSrc : string, name : string}) {
  return (
    <div className="flex flex-col gap-[10px] items-center">
      <div className="rounded-full p-[3px] border-2 border-violet-600">
        <img className="object-cover rounded-full w-[70px] h-[70px] " src={imgSrc} />
      </div>
      <h4 className="text-xs font-semibold text-gray-700">{name}</h4>
    </div>
  );
}
