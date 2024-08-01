import { ImerchantUser, IpublicUser, Iuser } from "@/app/models/user";
import Button from "@/components/molecules/Button";

import {
  capitalizeWords,
  getAuth,
  handleAddImg,
  handleAddSingleImg,
} from "@/scripts/utils";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
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

import clsx from "clsx";
import { HoverCardContent, HoverCardTrigger } from "components/ui/hover-card";
import Link from "next/link";

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
  //   const Router = useRouter();

  const isFollowing = false;
  const handleFollow = () => {
    console.log();
  };

  return (
    <div className="box-small w-full lg:max-w-[900px] ">
      <div className="">
        <div
          className={`bg-gray-300 dark:bg-darkMode-900 w-full h-[130px] rounded-md p-5 flex items-end justify-end`}
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
                  icon={{
                    icon: <BsCurrencyDollar size={18} />,
                    variant: "icon-label",
                  }}
                >
                  My Wallet
                </Button>
              </div>
            ) : (
              <Button
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
                disabled={isFollowing}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
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
                {following}
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
          <p className="text-gray-500 dark:text-slate-200 font-medium leading-relaxed">
            {user.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function UserName({
  name,
  imgSrc,
  userName,
  children,
  textSize,
  size,
  className,
  type,
  isVerified,
  disableShowUser,
  nameTextColor,
  usernameTextColor,
  content,
  id,
  follow,
}: {
  name: string;
  userName?: string;
  imgSrc: string;
  children?: ReactNode;
  textSize?: string;
  size?: "default" | "small" | "large";
  className?: string;
  type: "merchant" | "general" | "assistant";
  isVerified: boolean;
  disableShowUser?: boolean;
  nameTextColor?: string;
  usernameTextColor?: string;
  id?: string;
  content?: string;
  follow?: { followerCount: number; followingCount: number };
}) {
  //   const Router = useRouter();
  return (
    <>
      <div className="flex gap-2">
        <UserProfileImage
          imgSrc={imgSrc}
          size={size}
          type={type}
          name={name}
          isVerified={true}
        />{" "}
        <div
          className={clsx(
            typeof content !== "undefined" && typeof userName === "undefined"
              ? "flex flex-col"
              : ""
          )}
        >
          {disableShowUser ? (
            <h4
              className={`${
                size === "small" ? "text-xs" : "text-sm "
              }  font-semibold ${
                nameTextColor
                  ? nameTextColor
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {name}
            </h4>
          ) : (
            <>
              <h4
                className={clsx(
                  `  font-bold hover:underline `,
                  size === "small" ? "text-xs" : "text-sm lg:text-base",
                  nameTextColor
                    ? nameTextColor
                    : "text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-2"
                )}
              >
                <span>{capitalizeWords(name)}</span>
                <span>
                  {
                    <MdVerified
                      size={16}
                      className="text-violet-600 dark:text-violet-400"
                    />
                  }
                </span>
              </h4>
            </>
          )}

          <p
            className={clsx(
              ` font-medium text-gray-400 text-xs lg:text-sm`,
              size === "small" ? "text-xs" : "text-sm",
              typeof content !== "undefined" && typeof userName === "undefined"
                ? "font-medium text-gray-700 dark:text-gray-200"
                : ""
            )}
          >
            {userName ? `@${userName}` : content ? content : ""}
          </p>
        </div>
      </div>
    </>
  );
}

export function UserProfileImage({
  size,
  imgSrc,
  name,
  type,
  isVerified,
}: {
  size?: "default" | "small" | "large";
  imgSrc: string;
  name: string;
  type: "merchant" | "general" | "assistant";
  isVerified: boolean;
}) {
  return (
    <div
      style={{
        backgroundColor: name ? alphabet[name[0].toLowerCase()] : "#d97706",
      }}
      className={clsx(
        "flex items-center justify-center font-medium object-cover bg-violet-100 border border-gray-100",
        size === "small"
          ? "w-[32px] h-[32px]"
          : size === "large"
          ? "w-[50px] h-50px"
          : "w-10 h-10",
        type === "merchant" ? "rounded-md " : "rounded-full"
        // isVerified ? "ring-2 ring-violet-600" : ""
      )}
    >
      {imgSrc === "" ? (
        <div className="w-full h-full flex items-center justify-center font-bold text-white">
          <BsPersonFill size={28} />
          {/* {name[0]?.toUpperCase()} */}
        </div>
      ) : (
        <img
          alt={`${name}'s profile picture`}
          src={imgSrc}
          className={clsx(
            `w-full h-full  object-cover border border-gray-100`,
            type === "merchant" ? "rounded-md " : "rounded-full"
          )}
        />
      )}
    </div>
  );
}

export function StackedProfile({
  image1,
  image2,
  type,
  size,
  extra,
  count,
}: {
  image1: string;
  image2: string;
  extra?: boolean;
  type: "merchant" | "general" | "assistant";
  size?: "default" | "small" | "extraSmall";
  count: number;
}) {
  return (
    <div className="flex">
      <div
        className={`${
          size === "small"
            ? "w-[32px] h-[32px]"
            : size == "extraSmall"
            ? "w-[20px] h-[20px]"
            : "w-10 h-10"
        }  flex items-center justify-center font-medium ${
          type === "merchant" ? "rounded-[12px]" : "rounded-full"
        } object-cover bg-violet-100 `}
      >
        {image1 === "" ? (
          <div className="w-full h-full rounded-full flex items-center justify-center text-violet-400">
            <BsPersonFill size={28} />
          </div>
        ) : (
          <img
            alt={`assistant's profile picture`}
            src={image1}
            className={`w-full h-full ${
              type === "merchant" ? "rounded-[12px]" : "rounded-full"
            } object-cover rounded-full`}
          />
        )}
      </div>
      {count > 1 && (
        <>
          {" "}
          <div
            className={`${
              size === "small"
                ? "w-[32px] h-[32px] -translate-x-3"
                : size == "extraSmall"
                ? "w-[20px] h-[20px] -translate-x-2"
                : "w-10 h-10"
            }  flex items-center justify-center font-medium ${
              type === "merchant" ? "rounded-[12px]" : "rounded-full"
            } object-cover bg-violet-100 `}
          >
            {image2 === "" ? (
              <div className="w-full h-full rounded-full flex items-center justify-center ring ring-white dark:ring-slate-700 text-violet-400">
                <BsPersonFill size={28} />
              </div>
            ) : (
              <img
                alt={`assistant's profile picture`}
                src={image2}
                className={`w-full h-full ${
                  type === "merchant" ? "rounded-[12px]" : "rounded-full"
                } object-cover rounded-full`}
              />
            )}
          </div>
          {extra && (
            <div
              className={`${
                size === "small"
                  ? "w-[32px] h-[32px] -translate-x-6"
                  : size == "extraSmall"
                  ? "w-[20px] h-[20px] "
                  : "w-10 h-10 -translate-x-6"
              }  flex items-center justify-center font-medium ${
                type === "merchant" ? "rounded-[12px]" : "rounded-full"
              } object-cover bg-violet-600  text-white ring ring-white dark:ring-slate-700 font-medium flex items-center justify-center`}
            >
              9+
            </div>
          )}
        </>
      )}
    </div>
  );
}

const alphabet: { [key: string]: string } = {
  a: "#d97706",
  b: "#c026d3",
  c: "#059669",
  d: "#9333ea",
  e: "#dc2626",
  f: "#f59e0b",
  g: "#065f46",
  h: "#8b5cf6",
  i: "#d97706",
  j: "#c026d3",
  k: "#059669",
  l: "#9333ea",
  m: "#dc2626",
  n: "#f59e0b",
  o: "#065f46",
  p: "#8b5cf6",
  q: "#d97706",
  r: "#c026d3",
  s: "#059669",
  t: "#9333ea",
  u: "#dc2626",
  v: "#f59e0b",
  w: "#065f46",
  x: "#8b5cf6",
  y: "#d97706",
  z: "#c026d3",
};
