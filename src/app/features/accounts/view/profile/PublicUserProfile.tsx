import useModal from "@/app/features/PopUp/hooks/useModal";
import { ImerchantUser, IpublicUser, Iuser } from "@/app/models/user";
import Button from "@/components/molecules/Button";
import { alphabet, UserProfileImage } from "@/components/molecules/UserName";
import {
  capitalizeWords,
  getAuth,
  handleAddImg,
  handleAddSingleImg,
} from "@/scripts/utils";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  BsCheck,
  BsCheckCircle,
  BsCheckCircleFill,
  BsCurrencyDollar,
  BsImageFill,
  BsPencil,
  BsPencilFill,
  BsPersonCheckFill,
  BsPersonFill,
  BsPersonPlusFill,
  BsPlusLg,
} from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import useChangeProfileImage from "../../hooks/profile/useChangeProfileImage";
import useFollow from "../../hooks/profile/useFollow";
import FollowButton, { followCountAtom } from "../FollowButton";
import Wallet from "../Wallet";

export default function PublicUserProfile({
  user,
  type,
  followers,
  following,
  postCount,
  followId,
}: {
  user: Iuser | ImerchantUser | IpublicUser;
  type: "private" | "public";
  followers: number;
  following: number;
  postCount?: number;
  followId?: string;
}) {
  const Router = useRouter();
  const { openModal } = useModal();

  const { imageList, setImageList, displayImage, setDisplayImage } =
    useChangeProfileImage(user.displayImageUrl as string);

  // const [followerCount, setFollowersCount] = useState(followers);

  // useEffect(() => {
  //   setFollowersCount(followers);
  // }, [followers]);

  const refreshData = () => {
    Router.replace(Router.asPath);
  };

  return (
    <div className="box-small w-full lg:max-w-[900px] ">
      <div className="">
        <div
          // style={{ backgroundColor: alphabet[user.name[0]] }}
          className={` bg-violet-400 w-full h-[130px] rounded-md p-5 flex items-end justify-end`}
        >
          {type === "private" && (
            <Button
              icon={{ icon: <BsImageFill size={18} />, variant: "icon-label" }}
              size={"default"}
              variant={"primary"}
            >
              Add Cover
            </Button>
          )}
        </div>
        <div className="-translate-y-6 px-[12px]">
          <div className="flex flex-wrap gap-4 justify-between items-end">
            <div className="flex gap-4 items-end">
              <img
                alt=""
                src={
                  user.displayImageUrl ? user.displayImageUrl : "/blackPP.png"
                }
                className={`w-[80px] h-[80px] ${
                  user.accountType === "merchant"
                    ? "rounded-[12px]"
                    : "rounded-full"
                } object-cover  border-2 border-white cursor-pointer`}
                onClick={() => {
                  openModal({
                    modalChild: (
                      <ChangeProfileImage
                        displayImageUrl={user.displayImageUrl as string}
                        type={type}
                      />
                    ),
                    title: "Profile Picture",
                    subtitle: "",
                    action: () => {},
                  });
                }}
              />

              <div className="">
                <div className="">
                  <h4
                    className={` text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300 flex gap-3 items-center`}
                  >
                    <span>{capitalizeWords(user.name)}</span>
                    <span>
                      {
                        <MdVerified
                          size={20}
                          className="text-violet-600 dark:text-violet-400"
                        />
                      }
                    </span>
                  </h4>
                  <p className={`text-sm font-normal text-gray-400`}>
                    @{user.username}{" "}
                  </p>
                </div>
              </div>
            </div>
            {type === "private" ? (
              <div className="flex flex-wrap gap-4 justify-center w-full lg:w-auto items-center">
                <Button
                  onClick={() => {
                    if (getAuth()?.accountType === "merchant") {
                      Router.push(`/app/merchant/profile/${getAuth()?.id}`);
                    } else {
                      Router.push(`/app/profile/${getAuth()?.id}`);
                    }
                  }}
                  className="rounded-md"
                  size={"default"}
                  variant={"secondary"}
                  icon={{ icon: <BsPencil size={18} />, variant: "icon-label" }}
                >
                  Edit Profile
                </Button>
                <Button
                  className="rounded-md"
                  size={"default"}
                  variant={"secondary"}
                  onClick={() => {
                    openModal({
                      modalChild: <Wallet />,
                      title: "Your Wallet",
                      subtitle: "",
                      action: () => {},
                    });
                  }}
                  icon={{
                    icon: <BsCurrencyDollar size={18} />,
                    variant: "icon-label",
                  }}
                >
                  My Wallet
                </Button>
              </div>
            ) : (
              //  follow button
              <FollowButton
                onClick={() => {
                  refreshData();
                }}
                user={user as IpublicUser}
              />
            )}
          </div>
        </div>

        <div className="text-sm font-medium  p-2 flex flex-col gap-4">
          <div className="flex gap-10 text-gray-700 dark:text-gray-300 lg:justify-start justify-center mb-5">
            <h4 className="flex flex-col gap-2 items-center">
              <span className="text-lg lg:text-2xl font-semibold">
                {followers}
              </span>{" "}
              <span>Followers</span>
            </h4>
            <h4 className="flex flex-col gap-2 items-center border-x border-gray-200 dark:border-gray-500 px-3">
              <span className="text-lg lg:text-2xl font-semibold">
                {following ?? 0}
              </span>{" "}
              <span>Following</span>
            </h4>
            <h4 className="flex flex-col gap-2 items-center">
              <span className="text-lg lg:text-2xl font-semibold">
                {postCount ? postCount : 0}
              </span>{" "}
              <span>Posts</span>
            </h4>
          </div>
          {user.description !== "" && (
            <div className="">
              <h4 className="font-bold text-base text-gray-700 dark:text-gray-100">
                {user.accountType === "merchant" ? "About Us" : "About Me"}
              </h4>
              <p className="text-gray-500 dark:text-slate-200 font-medium leading-relaxed">
                {user.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChangeProfileImage({
  displayImageUrl,
  type,
}: {
  displayImageUrl: string;
  type: "private" | "public";
}) {
  const {
    imageList,
    setImageList,
    displayImage,
    setDisplayImage,
    uploadImage,
    isPending,
  } = useChangeProfileImage(displayImageUrl);

  return (
    <div>
      <div className="py-10">
        <div className="flex flex-col items-center gap-3">
          <img
            src={displayImage}
            alt=""
            className="w-[300px] h-[300px]  object-cover rounded-md "
          />

          {type === "private" && (
            <>
              <Button
                onClick={() => {
                  handleAddSingleImg(
                    setImageList,
                    setDisplayImage,
                    displayImage,
                    imageList
                  );
                }}
                size={"default"}
                variant={"primary"}
                icon={{
                  icon: <BsPlusLg />,
                  variant: "icon-label",
                }}
                className="w-full"
              >
                Change Image
              </Button>

              <Button
                onClick={() => {
                  uploadImage();
                }}
                size={"default"}
                variant={"primary"}
                isPending={isPending}
                className="w-full"
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
