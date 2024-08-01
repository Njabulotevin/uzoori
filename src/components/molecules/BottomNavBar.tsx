import React, { useState } from "react";
import { BsBellFill, BsEnvelopeFill, BsHeartFill, BsHouseFill } from "react-icons/bs";

export default function BottomNavBar() {
    const customShadow = {boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)"}

    const [active, setActive] = useState("Home")
    const menu = [
        {name : "Home", icon: <BsHouseFill/>},
        {name : "Messages", icon: <BsEnvelopeFill/>},
        {name : "Favorites", icon: <BsHeartFill/>},
        {name : "Notification", icon: <BsBellFill/>}
    ]
  return (
    <div style={customShadow} className="fixed min-w-[342px] bottom-[2px] z-50 left-[2vw] bg-white rounded-lg shadow-lg w-[95vw] p-[14px] px-[30px]">
     <div className="flex justify-between gap-2">
     {menu.map(({name, icon}, i)=>{
        return <div onClick={()=>{setActive(name)}} className={`text-violet-600 flex gap-1 p-[5px] rounded ${active === name?"bg-primary-100":""}`} key={i}><span>{icon}</span> {active===name?<span className="text-p4 font-medium">{name}</span>:""}</div>
      })}
     </div>
    </div>
  );
}
