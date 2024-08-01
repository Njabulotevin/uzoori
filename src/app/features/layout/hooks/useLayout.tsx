import { getAuth, logoOut } from "@/scripts/utils";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import {
  BsHouse,
  BsPerson,
  BsCalendar3,
  BsPeople,
  BsBox,
  BsGraphUp,
  BsChatSquareText,
  BsChatText,
  BsChatRightText,
  BsGear,
  BsGridFill,
  BsCalendar2CheckFill,
  BsBellFill,
  BsChatSquareFill,
  BsGearFill,
  BsBoxArrowLeft,
  BsQuestionCircleFill,
  BsBagCheckFill,
  BsPeopleFill,
  BsPlusLg,
  BsGrid,
  BsBagCheck,
  BsCalendar2Check,
  BsBell,
  BsChatSquare,
} from "react-icons/bs";

export interface InavLink {
  name: string;
  label: string;
  icon: ReactNode;
  link?: string;
  onClick: Function;
  activeIcon: ReactNode;
}

export default function useLayout() {
  const Router = useRouter();

  const Links: InavLink[] = [
    {
      name: "feeds",
      label: "Feeds",
      icon: <BsGrid size={18} />,
      activeIcon: <BsGridFill size={18} />,
      link: getAuth() ? "/app" : "/",
      onClick: () => {},
    },
    {
      name: "products",
      label: "Products",
      icon: <BsBagCheck size={18} />,
      activeIcon: <BsBagCheckFill size={18} />,
      link: `/app/merchant/products`,
      onClick: () => {},
    },
    {
      name: "newPost",
      label: "Create Post",
      icon: <BsPlusLg size={10} />,
      activeIcon: <BsPlusLg size={10} />,
      link: `/app/create_post`,
      onClick: () => {},
    },
    {
      name: "bookings",
      label: "bookings",
      icon: <BsCalendar2Check size={18} />,
      activeIcon: <BsCalendar2CheckFill size={18} />,
      link: "/app/merchant/bookings",
      onClick: () => {},
    },
    {
      name: "assistants",
      label: "Users",
      icon: <BsPeople size={18} />,
      activeIcon: <BsPeopleFill size={18} />,
      link: "/app/merchant/stylists",
      onClick: () => {},
    },
  ];

  const LinksGeneral: InavLink[] = [
    {
      name: "feeds",
      label: "Feeds",
      icon: <BsGrid size={18} />,
      activeIcon: <BsGridFill size={18} />,
      link: getAuth() ? "/app" : "/",
      onClick: () => {},
    },
    {
      name: "bookings",
      label: "Bookings",
      icon: <BsCalendar2Check size={18} />,
      activeIcon: <BsCalendar2CheckFill size={18} />,
      link: "/app/bookings",
      onClick: () => {},
    },
    {
      name: "newPost",
      label: "Create Post",
      icon: <BsPlusLg size={12} />,
      activeIcon: <BsPlusLg size={12} />,
      link: `/app/create_post`,
      onClick: () => {},
    },
    {
      name: "inbox",
      label: "inbox",
      icon: <BsBell size={18} />,
      activeIcon: <BsBellFill size={18} />,
      link: "/app/notifications",
      onClick: () => {},
    },
    {
      name: "Reviews",
      label: "Feedback",
      icon: <BsChatSquare size={18} />,
      activeIcon: <BsChatSquareFill size={18} />,
      link: "/app/feedback",
      onClick: () => {},
    },
  ];

  const OtherLinks: InavLink[] = [
    {
      name: "signout",
      label: "Sign Out",
      icon: <BsBoxArrowLeft size={18} />,
      activeIcon: <BsBoxArrowLeft size={18} />,
      onClick: () => {
        logoOut();
        Router.refresh();
      },
    },
    {
      name: "help",
      label: "Help",
      icon: <BsQuestionCircleFill size={18} />,
      activeIcon: <BsQuestionCircleFill size={18} />,
      onClick: () => {},
    },
  ];

  return { LinksGeneral, OtherLinks, Links };
}
