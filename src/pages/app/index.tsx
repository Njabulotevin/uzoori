import useFeeds from "@/app/features/content/hooks/useFeeds";
import ProductPost from "@/app/features/content/view/ProductPost";
import { iPost, Iuser } from "@/app/models/user";
import Button from "@/components/molecules/Button";
import FollowUserCard from "@/components/molecules/FollowUserCard";
import PopularSalons from "@/components/PopularSalons";
import Stories from "@/components/Stories";
import { ATest } from "test/Test";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useNavigationBar from "@/app/features/layout/hooks/useNavigationBar";
import { Iproduct } from "@/app/models/product";
import { Skeleton } from "components/ui/skeleton";
import RenderContent from "@/app/features/content/view/RenderContent";

export default function Index() {
  const { setActive } = useNavigationBar();

  useEffect(() => {
    setActive({ label: "feeds", data: "" });
  }, []);

  return (
    <div className="">
      <RenderContent />
    </div>
  );
}
