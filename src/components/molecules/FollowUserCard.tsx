import useFollow from "@/app/features/accounts/hooks/profile/useFollow";
import FollowButton from "@/app/features/accounts/view/FollowButton";
import { IpublicUser, Iuser } from "@/app/models/user";
import { capitalizeWords } from "@/scripts/utils";
import Link from "next/link";
import React from "react";
import { BsPersonCheckFill, BsPersonPlusFill } from "react-icons/bs";
import Button from "./Button";
import { UserProfileImage } from "./UserName";

export default function FollowUserCard({
  user,
  display,
  fullname,
  onClick,
}: {
  user: IpublicUser;
  fullname?: boolean;
  display: "horizontal" | "vertical";
  onClick: Function;
}) {
  const { isFollowing, handleFollow } = useFollow(
    user.id,
    user.username,
    user.followerCount as number,
    user.followId
  );
  return (
    <div
      className={`flex ${
        display === "vertical"
          ? "flex-col w-[140px] p-5 bg-gray-100 dark:bg-gray-600"
          : "flex-row p-2"
      } gap-4 items-center  rounded-[14px]  shrink-0 `}
    >
      <div className="shrink-0">
        <UserProfileImage
          imgSrc={(user.displayImageUrl as string) ?? ""}
          name={user.name}
          type={user.accountType}
          isVerified={true}
        />
      </div>
      <div
        className={`flex ${
          display === "vertical" ? "items-center " : "items-start flex-1"
        } flex-col `}
      >
        <Link href={`/${user.username}`}>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-100 hover:underline cursor-pointer">
            {fullname
              ? capitalizeWords(user.name)
              : capitalizeWords(user.name.split(" ")[0])}
          </h4>
        </Link>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-50">
          @{user.username}
        </p>
      </div>
      <FollowButton
        user={user}
        onClick={() => {
          onClick();
        }}
      />
    </div>
  );
}
