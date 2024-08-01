import { iPost, IpublicUser } from "@/app/models/user";
import TabCard, { tab } from "@/components/common/Tabs";
import { getAuth } from "@/scripts/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import {
  BsBagCheckFill,
  BsGridFill,
  BsImages,
  BsPeopleFill,
} from "react-icons/bs";
import EditableProfile, { UserName } from "./EditableProfile";

export default async function User({
  params,
}: {
  params: { username: string };
}) {
  const server_url = "https://295f-41-169-13-10.ngrok-free.app/api/v1";

  let posts: iPost[] = [];

  console.log("FOund username: ", params.username)

  const { data, status } = await axios.get(
    `${server_url}/user/username/${params.username}/`,
    {
      headers: {
        "Cache-Control": "no-store", // Disable caching
      },
    }
  );

  const user: IpublicUser = data.data;

  let activeTab: tab = {
    label: "Posts",
    icon: "",
    id: "posts",
  };

  const setActiveTab = (tab: tab) => {
    activeTab = tab;
  };

  const { data: PostsData } = await axios.get(
    `${server_url}/post/?userId=${
      data.data.id
    }&limit=20&offset=${new Date().getTime()}`,
    {
      headers: {
        "Cache-Control": "no-store", // Disable caching
      },
    }
  );
  posts = [...PostsData.data];

  const Tabs =
    user?.accountType === "merchant"
      ? [
          { label: "Posts", icon: <BsGridFill size={18} /> },
          { label: "Products", icon: <BsBagCheckFill size={18} /> },
          { label: "Assistants", icon: <BsPeopleFill size={18} /> },
        ]
      : [
          { label: "Posts", icon: <BsGridFill size={18} /> },
          { label: "Images", icon: <BsImages size={18} /> },
        ];

  return (
    <div className="flex w-full flex-col gap-5 max-w-[700px] mx-auto">
      <div className="mx-auto w-full">
        <EditableProfile
          user={
            {
              id: user.id,
              username: user.username,
              name: user.name,
              email: "",
              accountType: user.accountType,
              description: user.description,
              displayImageUrl: user.displayImageUrl,
              followId: user.followId,
            } as IpublicUser
          }
          type={user.id === getAuth()?.id ? "private" : "public"}
          followers={user.followerCount as number}
          following={user.followingCount as number}
          postCount={posts.length}
        />
      </div>
    </div>
  );
}
