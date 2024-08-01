import useNavigationBar from "@/app/features/layout/hooks/useNavigationBar";
import { IpublicUser } from "@/app/models/user";
import { capitalizeWords } from "@/scripts/utils";
import { HoverCard } from "@radix-ui/react-hover-card";
import clsx from "clsx";
import { HoverCardContent, HoverCardTrigger } from "components/ui/hover-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { BsCheckCircleFill, BsPerson, BsPersonFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

export default function UserName({
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
  const { setActive } = useNavigationBar();
  const Router = useRouter();
  return (
    <HoverCard>
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
            <HoverCardTrigger>
              <h4
                onClick={() => {
                  setActive({ label: "profile", data: name });
                  Router.push(`/${userName}`);
                }}
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
            </HoverCardTrigger>
          )}
          {follow && (
            <HoverCardContent className="bg-white dark:bg-darkMode-900 text-gray-700 dark:text-gray-200 border-none flex gap-3 items-start">
              <div className="flex flex-col gap-2">
                <UserProfileImage
                  imgSrc={imgSrc}
                  type={type}
                  name={name}
                  isVerified={true}
                />
                <div className="flex flex-col mb-3">
                  <h4
                    onClick={() => setActive({ label: "profile", data: name })}
                    className={clsx(
                      `  font-bold hover:underline text-xs`,
                      // size === "small" ? "text-xs" : "text-sm",
                      nameTextColor
                        ? nameTextColor
                        : "text-gray-700 dark:text-gray-300 text-md lg:text-base"
                    )}
                  >
                    {capitalizeWords(name)}
                  </h4>
                  {userName && (
                    <p
                      className={clsx(
                        ` font-medium text-gray-400 text-xs lg:text-sm`,
                        size === "small" ? "text-xs" : "text-sm",
                        typeof content !== "undefined" &&
                          typeof userName === "undefined"
                          ? "font-medium text-gray-700 dark:text-gray-200"
                          : ""
                      )}
                    >
                      @ {userName}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 ">
                  <p className="text-xs font-semibold">
                    <span className="font-bold">{follow.followerCount}</span>{" "}
                    Followers
                  </p>
                  <p className="text-xs font-semibold">
                    <span className="font-bold">{follow.followingCount}</span>{" "}
                    Following
                  </p>
                </div>
              </div>
            </HoverCardContent>
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
    </HoverCard>
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

export const alphabet: { [key: string]: string } = {
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
