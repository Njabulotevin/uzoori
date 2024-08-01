import { useRouter } from "next/navigation";
import React from "react";
import { BsHeart, BsPlus } from "react-icons/bs";
import Button from "./Button";
import ReviewRating from "./ReviewRating";
import SalonImage from "./SalonImage";
import UserName from "./UserName";

export default function PopularSalonCard({
  imgSrc,
  name,
}: {
  imgSrc: string;
  name: string;
}) {
  const Router = useRouter();
  return (
    <div
      className="flex flex-col gap-4 "
      onClick={() => {
        Router.push("/salon/Best+Styles");
      }}
    ></div>
  );
}
