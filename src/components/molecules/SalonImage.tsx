import React from 'react'

export default function SalonImage({imgSrc, imageSize} : {imgSrc : string, imageSize ?: string}) {
  return (
    <div className={`${imageSize?imageSize:"w-[88vw] lg:w-full lg:h-auto h-[60vw]"} min-w-[320px] min-h-[215px] relative `}>
        <span className="bg-violet-600 py-[3px] px-[6px] absolute rounded-full top-[10px] left-[10px]">
            <h4 className="text-p4 text-white">Open</h4>
        </span>
        <img className="object-cover rounded w-full h-full" src={imgSrc}/>
    </div>
  )
}
