import Button from "@/components/molecules/Button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useNavigationBar from "@/app/features/layout/hooks/useNavigationBar";
import { isAddressBarShowing, isMobileBrowser } from "@/scripts/utils";
import RenderContent from "@/app/features/content/view/RenderContent";

export default function Home() {
  const Router = useRouter();

  // const { posts } = useFeeds();
  const { setActive: setActiveNav } = useNavigationBar();
  useEffect(() => {
    setActiveNav({ label: "feeds", data: "" });
  }, []);

  return (
    <div className="">
      <RenderContent />
    </div>
  );
}

const users = [
  {
    username: "johndoe123",
    name: "John Doe",
    email: "johndoe123@example.com",
    accountType: "general",
    description:
      "I'm an avid reader and love to explore new genres. Looking for book recommendations!",
    displayImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    username: "janedoe456",
    name: "Jane Doe",
    email: "janedoe456@example.com",
    accountType: "general",
    description:
      "I'm a travel enthusiast and always on the lookout for new destinations to visit.",
    displayImageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    username: "bobsmith789",
    name: "Bob Smith",
    email: "bobsmith789@example.com",
    accountType: "general",
    description:
      "I'm a foodie and love to try out new restaurants and recipes.",
    displayImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    username: "sarahjones101",
    name: "Sarah Jones",
    email: "sarahjones101@example.com",
    accountType: "general",
    description:
      "I'm a fitness enthusiast and enjoy trying out new workout routines.",
    displayImageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    username: "alexanderbrown",
    name: "Alexander Brown",
    email: "alexanderbrown@example.com",
    accountType: "general",
    description:
      "I'm a tech enthusiast and always interested in the latest gadgets and software.",
    displayImageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
