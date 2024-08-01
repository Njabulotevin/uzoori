import { EmptyProfile } from "@/components/Data/data";
import { MouseEventHandler } from "react";

export default function StylistUser({
    name,
    username,
    profile,
    showBtn,
    onClick
  }: {
    name: string;
    username: string;
    profile: string;
    showBtn ?: boolean 
    onClick ?: MouseEventHandler
  }) {
    return (
      <div className=" w-full">
        <div className="flex justify-between text-p3">
          <div className="flex gap-4">
            <div className="w-[40px] h-[40px] rounded-full">
              {profile ? (
                <img
                  className="w-[40px] h-[40px] object-cover rounded-full"
                  src={profile}
                />
              ) : (
                <div className="bg-slate-100 rounded-full font-semibold w-[40px] h-[40px] flex items-center justify-center text-p1">
               
                 <EmptyProfile color="#E2E8F0"/>
                </div>
              )}
            </div>
            <div className="">
              <h4 className="font-semibold text-xs text-slate-800">{name}</h4>
              <div className="text-xs font-medium text-slate-400">{username}</div>
            </div>
          </div>
  
        {showBtn &&  <div  onClick={onClick} className="text-neutral-300">
            <button type="button" className="btn btn-secondary">
              <span className="">Delete</span>
            </button>
          </div>}
        </div>
      </div>
    );
  }
  