import { iPost, IpublicUser } from "@/app/models/user";
import { tab } from "@/components/common/Tabs";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, ReactNode } from "react";
import {
  BsGridFill,
  BsBagCheckFill,
  BsPeopleFill,
  BsImages,
} from "react-icons/bs";
import { useGetPostsByUserIdQuery } from "../../content/contentApiSlice";
import { useGetAllAssistantLinkedToMerchantQuery } from "../../merchant/merchantApiSlice";

export default function useUserDetails(id: string, user?: IpublicUser) {
  const [userPosts, setUserPosts] = useState<iPost[]>([]);
  const [postCount, setPostCount] = useState<number>(0);
  const [assistants, setAssistants] = useState<IpublicUser[]>([]);
  const [activeTab, setActiveTab] = useState<tab>({
    label: "Posts",
    icon: "",
    id: "posts",
  });

  const Tabs =
    user?.accountType === "merchant"
      ? [
          { label: "Posts", icon: <BsGridFill size={18} />, id: "posts" },
          {
            label: "Products",
            icon: <BsBagCheckFill size={18} />,
            id: "products",
          },
          {
            label: "Assistants",
            icon: <BsPeopleFill size={18} />,
            id: "assistants",
          },
        ]
      : [
          { label: "Posts", icon: <BsGridFill size={18} />, id: "posts" },
          { label: "Images", icon: <BsImages size={18} />, id: "images" },
        ];

  const {
    data: merchantAssistants,
    isLoading,
    isSuccess,
  } = useGetAllAssistantLinkedToMerchantQuery({ id: id });

  // useEffect(() => {
  //   if (postsData) {
  //     setUserPosts(postsData?.data);
  //     setPostCount(postsData?.data.length);
  //   }
  // }, [postsDataLoading, postsDataSuccess]);

  useEffect(() => {
    if (merchantAssistants) {
      setAssistants(merchantAssistants?.data.map((user: any) => user.user));
    }
  }, [merchantAssistants, isSuccess]);

  return { userPosts, activeTab, setActiveTab, Tabs, postCount, assistants };
}
