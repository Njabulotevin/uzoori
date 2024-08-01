import React from "react";
import { BsHouseFill, BsInfoCircle, BsInfoCircleFill, BsQuestionCircleFill, BsXLg } from "react-icons/bs";

export default function MobileMenuDrawer({setMenuOpen} : {setMenuOpen : Function}) {
  const items = [
    { name: "Home", icon: <BsHouseFill /> },
    { name: "About", icon: <BsInfoCircleFill /> },
    { name: "Support", icon: <BsQuestionCircleFill /> },

  ];

  return (
    <div className="absolute z-50 w-full left-0 top-0 bg-violet-600/60">
      <div className="h-screen w-[80vw] flex flex-col gap-[40px] mr-0 ml-auto bg-white rounded-tl-2xl rounded-bl-2xl p-[36px]">
        <div className="text-violet-600" onClick={()=>setMenuOpen(false)}>
          <BsXLg onClick={()=>setMenuOpen(false)}/>
        </div>
        <div className="flex flex-col gap-4">
          <button className="btn btn-primary">Login</button>
          <button className="btn btn-secondary">Create Account</button>
        </div>

        <div className="flex flex-col gap-[20px]">
            {items.map((item, i)=>{
                return <div key={i} className="flex gap-4 text-violet-600 font-medium text-p2">
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                </div>
            })}
        </div>
      </div>
    </div>
  );
}
