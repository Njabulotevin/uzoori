import useNavigationBar from "@/app/features/layout/hooks/useNavigationBar";
import useModal from "@/app/features/PopUp/hooks/useModal";
import { iComment } from "@/app/models/content";
import { IpublicUser } from "@/app/models/user";
import { getRelativeDate } from "@/scripts/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BsDot, BsHeartFill, BsThreeDots } from "react-icons/bs";
import UserName, { UserProfileImage } from "../molecules/UserName";

export default function Comment({
  user,
  date,
  message,
  replies,
}: {
  user: IpublicUser;
  date: Date;
  message: string;
  replies?: iComment[];
}) {
  const { setActive } = useNavigationBar();
  const Router = useRouter();

  const { closeModal } = useModal();
  return (
    <div className="flex f gap-4 py-4 text-gray-700 dark:text-gray-100 w-[100%]">
      <div className="flex justify-between">
        <UserProfileImage
          name={user.name}
          // userName={user.username}
          imgSrc={user.displayImageUrl}
          type={user.accountType}
          isVerified={false}
          size="small"
        />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1">
          <h4
            onClick={() => {
              setActive({ label: "profile", data: user.name });
              window.location.href = `/user/${user.username}`;
              closeModal();
            }}
            className="text-xs lg:text-sm text-gray-400 font-bold flex hover:underline cursor-pointer"
          >
            <span>{user.name}</span>
            {/* {user.id && (
              <span className="font-medium text-violet-600">Creator</span>
            )} */}
          </h4>

          <div className="">
            <p className="text-xs lg:text-sm ">{message}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-5">
            <p className="text-xs text-gray-400 font-medium flex ">
              <span>
                {getRelativeDate(date) === "less than a minute ago"
                  ? "Now"
                  : getRelativeDate(date)}
              </span>
            </p>
            <p className="text-xs text-gray-400 font-medium flex underline cursor-pointer">
              Reply
            </p>
          </div>
          <div className="flex justify-end">
            <div className="flex gap-1 items-center text-[10px] lg:text-xs font-semibold text-gray-500">
              <BsHeartFill className="text-gray-300 " size={20} />
              <p className=""></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="">
// <BsThreeDots />
// </div>
