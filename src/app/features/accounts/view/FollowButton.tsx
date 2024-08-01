import { IpublicUser } from "@/app/models/user";
import Button from "@/components/molecules/Button";
import { isLoggedIn } from "@/scripts/utils";
import { atom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { BsPersonCheckFill, BsPersonPlusFill } from "react-icons/bs";
import useFollow from "../hooks/profile/useFollow";

export const followCountAtom = atom<number>(0);

export default function FollowButton({
  user,
  onClick,
}: {
  user: IpublicUser;
  onClick: Function;
}) {
  const Router = useRouter();
  const { isFollowing, handleFollow, followerCount } = useFollow(
    user.id as string,
    user.username as string,
    user.followerCount as number,
    user.followId
  );
  return (
    <Button
      className="w-[110px]"
      size={"default"}
      variant={isFollowing ? "secondary" : "primary"}
      icon={{
        icon: isFollowing ? (
          <BsPersonCheckFill size={18} />
        ) : (
          <BsPersonPlusFill size={18} />
        ),
        variant: "icon-label",
      }}
      onClick={() => {
        if (isLoggedIn()) {
          handleFollow(user.id as string);

          onClick();
        } else {
          Router.push("/account/login");
        }
      }}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
