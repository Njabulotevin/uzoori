import React from 'react'
import { BsPlus } from 'react-icons/bs';

export default function Followers() {
    return (
        <div className="flex justify-center items-center gap-10">
          <div className="text-p2 text-neutral-400 font-medium">
            <h4>
              <span className="text-violet-600">506</span> Followers
            </h4>
          </div>
          <div className="">
            <button className="flex gap-2 items-center bg-transparent rounded-full border border-violet-600 text-violet-600 p-[8px] px-[15px] font-medium text-p3">
              <BsPlus size={16}/>
              <span >Follow</span>
            </button>
          </div>
        </div>
      );
}

