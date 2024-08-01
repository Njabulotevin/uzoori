import { Inotification } from "@/app/models/notifications";
import { IpublicUser, Iuser } from "@/app/models/user";
import Button from "@/components/molecules/Button";
import UserName, { UserProfileImage } from "@/components/molecules/UserName";
import { StringOrTemplateHeader } from "@tanstack/react-table";
import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import {
  BsBellFill,
  BsChatSquareDotsFill,
  BsHeartFill,
  BsPeople,
  BsPeopleFill,
} from "react-icons/bs";
import { useGetUserByUsernameQuery } from "../../accounts/accountApiSlice";
import usePostView from "../../content/hooks/usePostView";
import useNotifications from "../hooks/useNotifications";

export function Notification({
  notification,
}: {
  notification: Inotification;
}) {
  const Router = useRouter();
  const regexPattern = /@(\w+)/;
  const matches = notification.message.match(regexPattern) ?? [];
  const posIdRegex = /:(\w+(?:-\w+)+)/;
  const postId = notification.message.match(posIdRegex) ?? [];
  const { openPostById } = usePostView();

  switch (notification.notificationType) {
    case "follow":
      return (
        <NotificationWrapper
          onClick={() => {
            Router.push(`/${matches[1]}`);
          }}
          notification={notification}
        >
          <div className="flex items-center rounded-md text-gray-100 justify-center w-[50px] h-[50px] ">
            <NotificationUser username={matches[0]! as string} />
          </div>
        </NotificationWrapper>
      );
    case "like":
      return (
        <NotificationWrapper
          onClick={() => {
            if (postId) {
              openPostById(postId[1]);
            }
          }}
          notification={notification}
        >
          <div className="flex items-center rounded-md text-gray-100 justify-center w-[50px] h-[50px] bg-red-400">
            <BsHeartFill size={20} />
          </div>
        </NotificationWrapper>
      );
    case "comment":
      return (
        <NotificationWrapper
          onClick={() => {
            if (postId) {
              openPostById(postId[1]);
            }
          }}
          notification={notification}
        >
          <NotificationUser username={matches[0]! as string} />
        </NotificationWrapper>
      );
    default:
      return (
        <NotificationWrapper onClick={() => {}} notification={notification}>
          <div className="flex items-center rounded-md text-gray-100 justify-center w-[50px] h-[50px] bg-indigo-400">
            <BsBellFill size={20} />
          </div>
        </NotificationWrapper>
      );
  }
}

function NotificationWrapper({
  onClick,
  children,
  notification,
}: {
  onClick: Function;
  children: ReactNode;
  notification: Inotification;
}) {
  const { user, message, createdAt, notificationType } = notification;
  const regexPattern = /@(\w+)/;
  const matches = message.match(regexPattern) ?? [];
  const { markAsRead } = useNotifications();
  const posIdRegex = /:(\w+(?:-\w+)+)/;
  const postId = notification.message.match(posIdRegex) ?? [];
  const [seen, setSeen] = useState(notification.seen);
  return (
    <div
      onClick={() => {
        onClick();
        markAsRead(notification.id);
        setSeen(true);
      }}
      className={clsx(
        "flex flex-wrap gap-2 cursor-pointer justify-between items-center   text-gray-700 dark:text-gray-100 rounded-md p-4",
        seen ? "" : "bg-gray-100 dark:bg-darkMode-900"
      )}
    >
      <div className="flex gap-4">
        <div className="shrink-0">{children}</div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">
            <span className="font-bold hover:underline text-violet-400">
              {matches[0]}
            </span>

            {message
              .replace(matches[0] as string, "")
              .replace(`${postId[0]}`, "")
              .replace(`${postId[0]}`, "")}
          </p>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
            {format(new Date(createdAt * 1000), "MMM dd")} at{" "}
            {format(new Date(createdAt * 1000), "HH:mm")}
          </p>
        </div>
      </div>
    </div>
  );
}

function NotificationUser({ username }: { username: string }) {
  const [user, setUser] = useState<IpublicUser>({
    id: "",
    username: "",
    name: "",
    displayImageUrl: "",
    followerCount: 0,
    followingCount: 0,
    followId: "",
    description: "",
    accountType: "general",
  });
  const { data, isLoading } = useGetUserByUsernameQuery({
    username: username,
    userId: "",
  });

  useEffect(() => {
    if (data) {
      setUser(data.data as IpublicUser);
    }
  }, [data, isLoading]);
  if (isLoading || !user) {
    return (
      <div className="rounded-full bg-gray-200 w-[40px] h-[40px] dark:bg-darkMode-500"></div>
    );
  } else {
    return (
      <UserProfileImage
        imgSrc={user.displayImageUrl as string}
        name={user.name as string}
        type={user.accountType}
        isVerified={false}
      />
    );
  }
}
