import { ImerchantUser } from "@/app/models/user";
import { Logo } from "@/components/Data/data";
import Button from "@/components/molecules/Button";
import { DropDown } from "@/components/molecules/Form";
import UserName from "@/components/molecules/UserName";
import { capitalizeWords, getAuth } from "@/scripts/utils";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { BsPlusLg } from "react-icons/bs";
import useCreateAssistant from "../../accounts/hooks/useCreateAssistant";
import useNotifications from "../../notifications/hooks/useNotifications";
import useModal from "../../PopUp/hooks/useModal";
import useLayout, { InavLink } from "../hooks/useLayout";
import { activeViewAtom } from "../LayouStore";

export default function SideBar() {
  const { LinksGeneral, OtherLinks, Links } = useLayout();
  const Router = useRouter();
  const { handleMigrateToAssistant } = useCreateAssistant();
  const { name, username, displayImageUrl, accountType, id } = getAuth()
    ? (getAuth() as ImerchantUser)
    : { name: "", username: "", displayImageUrl: "", accountType: "", id: "" };
  return (
    <div className="border-r relative mt-[80px] bg-white dark:bg-transparent border-gray-200 dark:border-darkMode-500  max-w-[330px]  min-h-screen p-5 flex items-center lg:flex-col gap-6">
      {getAuth() ? (
        <div className=" flex flex-col gap-4 items-start min-w-[280px] px-10 py-4 border border-slate-200 dark:border-gray-600 dark:bg-darkMode-900 rounded-[15px]">
          <UserName
            name={capitalizeWords(name.split(" ")[0])}
            userName={username}
            imgSrc={displayImageUrl as string}
            type={accountType as "merchant" | "assistant" | "general"}
            isVerified={true}
            id={id}
          />
          <Button
            onClick={() => {
              Router.push("/app/create_post");
            }}
            className="w-full"
            size={"default"}
            variant={"primary"}
            icon={{ icon: <BsPlusLg />, variant: "icon-label" }}
          >
            Create Post
          </Button>
        </div>
      ) : (
        ""
      )}

      {/* ---------------------------------Links start-------------------------------------------- */}

      <div className="w-full">
        {getAuth()?.accountType === "merchant" ? (
          <RenderLinks List={Links} />
        ) : (
          <RenderLinks List={LinksGeneral} />
        )}
      </div>

      {/* ---------------------------------banner start-------------------------------------------- */}
      {getAuth()?.accountType === "general" && (
        <div className="bg-violet-50 dark:bg-darkMode-900 rounded flex flex-col gap-4 p-5 items-center text-center">
          <h4 className="text-base font-semibold text-violet-800 dark:text-slate-200">
            Upgrade to Assistant User
          </h4>
          <p className="text-violet-500 dark:text-slate-400">
            level up your account and start earning.
          </p>
          <Button
            onClick={handleMigrateToAssistant}
            size={"default"}
            variant={"primary"}
          >
            Upgrade Now
          </Button>
        </div>
      )}
      {/* ---------------------------------other links start-------------------------------------------- */}
      <div className="w-full">{<RenderLinks List={OtherLinks} />}</div>
      <p className="text-gray-400 text-xs">
        Copyright ©2023 uzoori. All rights reserved
      </p>
    </div>
  );
}

export function RenderLinks({ List }: { List: InavLink[] }) {
  const Router = useRouter();

  return (
    <div className="flex flex-row w-[calc(100vw-20px)] lg:w-auto lg:flex-col justify-between lg:gap-[8px] mx-auto overflow-y-auto">
      {List.map((item, i) => {
        if (item.name === "newPost") {
          return (
            <div
              key={i}
              className="flex w-[82px] mx-2 items-center justify-center lg:hidden"
            >
              <Button
                className="shadow-md p-2 px-4 h-[35px] "
                size={"large"}
                variant={"primary"}
                onClick={() => Router.push(item.link as string)}
                icon={{ icon: item.icon, variant: "icon-only" }}
              ></Button>
            </div>
          );
        } else {
          return <MenuItem key={i} item={item} />;
        }
      })}
    </div>
  );
}

function MenuItem({ item, key }: { item: InavLink; key: unknown }) {
  const Router = useRouter();
  const [active, setActive] = useAtom(activeViewAtom);
  const { count: notificationCount } = useNotifications();

  return (
    <div
      key={item.name + "_" + key}
      className={`flex flex-col w-[82px] lg:w-auto lg:flex-row gap-2 lg:gap-5 lg:px-5 px-[5px] py-[10px] items-center cursor-pointer ${
        item.name === active.label
          ? "lg:bg-violet-600  lg:text-white"
          : "lg:text-gray-800"
      }  dark:text-slate-300 rounded lg:dark:hover:bg-darkMode-500  `}
      onClick={() => {
        item.onClick();
        if (item.link) {
          Router.push(item.link);
        }
        setActive({ label: item.name, data: "" });
      }}
    >
      <div
        className={`${
          item.name === active.label
            ? " lg:text-white  lg:bg-transparent rounded-md dark:hover:text-white relative"
            : "text-gray-800 dark:text-slate-300 dark:hover:text-white"
        } font-medium text-sm p-2 lg:p-0`}
      >
        {item.name === "inbox" && notificationCount !== 0 && (
          <span className="bg-red-700 flex lg:hidden cursor-pointer absolute z-[100] bottom-3 -right-3 text-white px-1 rounded text-xs font-medium">
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        )}
        {item.name === active.label ? item.activeIcon : item.icon}
      </div>
      <div className=" font-medium text-sm lg:text-base dark:text-slate-300">
        {capitalizeWords(item.label)}
      </div>
    </div>
  );
}
