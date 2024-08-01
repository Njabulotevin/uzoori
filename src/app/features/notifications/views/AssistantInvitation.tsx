import { Inotification } from "@/app/models/notifications";
import { IpublicUser, Iuser } from "@/app/models/user";
import Button from "@/components/molecules/Button";
import UserName, { UserProfileImage } from "@/components/molecules/UserName";
import { format } from "date-fns";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import {
  BsBellFill,
  BsChatSquareDotsFill,
  BsHeartFill,
  BsPeople,
  BsPeopleFill,
} from "react-icons/bs";
import { useGetUserByUsernameQuery } from "../../accounts/accountApiSlice";
import useAssistantInvitation from "../hooks/useAssistantInvitation";

export default function AssistantInvitation() {
  const { assistantInvites } = useAssistantInvitation();

  console.log(assistantInvites);

  return (
    <div className="box-small">
      <h4 className="text-base font-semibold text-gray-700 dark:text-gray-100">
        Notifications
      </h4>

      <div className="flex flex-col gap-2">
        {assistantInvites.map((item, i) => {
          return (
            <AssistantNotification
              key={i}
              id={item?.id}
              user={item.merchant}
              date={new Date(item.createdAt)}
            />
          );
        })}
      </div>
    </div>
  );
}

function AssistantNotification({
  user,
  date,
  id,
}: {
  user: {
    id: string;
    deletedAt: null;
    name: string;
    username: string;
    displayImageUrl?: string;
  };
  id: string;
  date: Date;
}) {
  const { handleAccept, handleReject } = useAssistantInvitation();
  return (
    <div className="flex flex-wrap gap-2 justify-between items-center bg-gray-100 dark:bg-darkMode-900 text-gray-700 dark:text-gray-100 rounded-[14px] p-4">
      <div className="flex gap-4">
        <div className="shrink-0">
          <UserProfileImage
            imgSrc={""}
            name={"Jane Doe"}
            type={"general"}
            isVerified={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold">
            You have received an invitation to join{" "}
            <span className="text-violet-600">{user.name}</span> as an
            assistant.
          </p>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
            {format(date, "MMM dd")} at {format(date, "HH:mm")}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button size={"default"} variant={"secondary"} onClick={handleReject}>
          Reject
        </Button>
        <Button
          size={"default"}
          variant={"primary"}
          onClick={() => handleAccept(id)}
        >
          Accept
        </Button>
      </div>
    </div>
  );
}
