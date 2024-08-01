import SideBar, { RenderLinks } from "@/app/features/layout/views/SideBar";
import Modal from "@/app/features/PopUp/views/Modal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Logo } from "@/components/Data/data";
import { getAuth, isLoggedIn, logoOut, titleCap } from "@/scripts/utils";
import { removeCookies } from "cookies-next";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
  BsArrowLeft,
  BsBagFill,
  BsBellFill,
  BsBoxArrowLeft,
  BsCalendar2CheckFill,
  BsChatTextFill,
  BsCheckSquare,
  BsCheckSquareFill,
  BsChevronLeft,
  BsDot,
  BsGear,
  BsGearFill,
  BsPencilSquare,
  BsPlugFill,
  BsPlusCircle,
  BsPlusCircleFill,
  BsPlusLg,
  BsSearch,
  BsTagFill,
  BsThreeDotsVertical,
  BsXLg,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../Form";
import UserName, { UserProfileImage } from "../UserName";
import { Links, LinksGeneral, OtherLinks } from "./Data";
import useLayout from "@/app/features/layout/hooks/useLayout";
import NavigationBar from "@/components/NavigationBar";
import Toast from "@/app/features/PopUp/views/Toast";
import Button from "../Button";
import { Iproduct } from "@/app/models/product";
import FollowUserCard from "../FollowUserCard";
import { Iuser } from "@/app/models/user";
import { SpinningWheel } from "@/components/SpinningWheel";
import useSearch from "@/app/features/search/hooks/useSearch";
import { useAtom } from "jotai";
import {
  isModalOnAtom,
  modalAtom,
} from "@/app/features/PopUp/stores/ModalStore";
import { isToastOnAtom } from "@/app/features/PopUp/stores/ToastStore";
import { loadingAtom } from "@/app/features/PopUp/stores/LoadingStore";
import { activeViewAtom } from "@/app/features/layout/LayouStore";
import { drawerAtom } from "@/app/features/MobileDrawer/DrawerStore";
import { IoMenuOutline, IoSend } from "react-icons/io5";
import FullPostView from "@/app/features/content/view/FullPostView";
import usePostView from "@/app/features/content/hooks/usePostView";
import useSnapScroll from "@/app/features/content/hooks/useSnapScroll";
import Search from "@/app/features/search/views/Search";
import { ErrorBoundary } from "react-error-boundary";
import PostViewMediaPlay from "@/app/features/content/view/PostViewMediaPlay";
import useNavigationBar from "@/app/features/layout/hooks/useNavigationBar";
import { cartAtom, isCartOnAtom } from "@/app/features/Cart/CartSore";
import useCart from "@/app/features/Cart/hooks/useCart";
import Cart from "@/app/features/Cart/views/Cart";
import { Dialog } from "@headlessui/react";
import useBottomToast from "@/app/features/PopUp/hooks/useBottomToast";
import BottomToast from "@/app/features/PopUp/views/BottomToast";
import usePeopleYouMayKnow from "@/app/features/accounts/hooks/usePeopleYouMayKnow";
import useNotifications from "@/app/features/notifications/hooks/useNotifications";

export default function Layout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const Router = useRouter();

  const backgroundUserStyle = {
    backgroundSize: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
    backgroundImage: ``,
  };

  const handleLogOut = () => {
    removeCookies("user");
    Router.refresh();
  };

  // const isModalOn: boolean = useAppSelector((state) => state.modal.isOn);
  // const dispatch = useAppDispatch();
  const [appModal] = useAtom(isModalOnAtom);
  const [appToast] = useAtom(isToastOnAtom);
  const [isPending] = useAtom(loadingAtom);
  const { Links, LinksGeneral } = useLayout();

  // -----------cart----------

  const { cart, isCartOn, toggleCart } = useCart();
  // -----------cart----------

  const search = useSearch();
  const { peopleYouMayKnow } = usePeopleYouMayKnow(8);

  const pathname = usePathname();

  const isInFeeds = pathname === "/app" || pathname === "/app/merchant";

  const [isDrawerOn, setIsDrawerOn] = useAtom(drawerAtom);

  const { isPostViewOn, openPost, closePost } = usePostView();
  const { active, setActive } = useNavigationBar();
  const { isToastOn } = useBottomToast();

  const { count: notificationCount } = useNotifications();

  return (
    <div className="gap-2 w-full lg:grid lg:grid-cols-[330px_minmax(600px,_1fr)]  xl:grid-cols-[330px_minmax(600px,_1fr)_330px] max-w-[1920px]">
      {isPending && (
        <div className="fixed top-0 w-full z-[3000] h-screen bg-violet-600/30  flex items-center justify-center text-white">
          <SpinningWheel />
        </div>
      )}
      {appModal && (
        <div className="fixed left-0 w-full h-screen z-[1000] bottom-0">
          <Modal />
        </div>
      )}

      {appToast && (
        <div className="fixed top-5 z-[200] w-[600px] left-[calc((100vw-600px)/2)] animate__animated animate__slideInDown animate__faster">
          <Toast />
        </div>
      )}
      {isPostViewOn && <PostViewMediaPlay />}

      {isDrawerOn && <Drawer />}
      {isToastOn && <BottomToast />}

      <div className="fixed z-[100] col-span-2 hidden lg:flex">
        <SideBar />
      </div>

      <div className="flex fixed top-0 w-[100vw] z-[120] lg:hidden">
        <NavigationBar>
          {active.label === "feeds" ? (
            <HomeNavBarChild />
          ) : active.label === "search" ? (
            <div className="flex items-center justify-between w-full">
              <div
                className="dark:text-gray-100 cursor-pointer"
                onClick={() => Router.back()}
              >
                <BsChevronLeft size={25} />
              </div>
              {/* <form
                className="flex gap-2 flex-1"
                onSubmit={search.handleSubmit}
              >
                <Input
                  value={search.values.question}
                  placeholder={"Search"}
                  onChange={search.handleChange}
                  name={"question"}
                  isRequired={false}
                  isError={false}
                  icon={{
                    element: <BsSearch />,
                    position: "left",
                    onClick: () => {},
                  }}
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  className="p-3"
                  size={"default"}
                  variant={"primary"}
                  icon={{ icon: <BsSearch size={17} />, variant: "icon-only" }}
                ></Button>
              </form> */}

              <Search />
            </div>
          ) : active.label === "profile" ? (
            <div className="dark:text-gray-100 w-full flex gap-5 justify-between items-center cursor-pointr">
              <div className="flex gap-5">
                <div className="cursor-pointer" onClick={() => Router.back()}>
                  <BsChevronLeft size={25} />
                </div>
                <h4 className="font-medium">{active.data}</h4>
              </div>
              <div className="">
                <div
                  className="relative flex items-center w-[20px] h-[20px]"
                  onClick={toggleCart}
                >
                  {Object.keys(cart).length !== 0 && (
                    <span className="bg-red-700 cursor-pointer absolute z-[100] bottom-3 -right-3 text-white px-2 rounded text-xs font-medium">
                      {Object.keys(cart).length > 9
                        ? "9+"
                        : Object.keys(cart).length}
                    </span>
                  )}
                  <button>
                    <BsBagFill size={20} className="dark:text-white" />
                  </button>
                </div>
                {isCartOn && (
                  <div className="absolute top-16 right-0 w-[90vw]">
                    <Cart />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="dark:text-gray-100 flex gap-5 justify-between items-center cursor-pointr">
              <div className="cursor-pointer" onClick={() => Router.back()}>
                <BsChevronLeft size={25} />
              </div>
              <h4 className="font-medium">{active.label}</h4>
            </div>
          )}
        </NavigationBar>
      </div>

      <div
        className={`fixed z-[140] lg:h-[80px] bottom-[0vh] lg:top-0 left-0 w-[100vw]`}
      >
        <div className="flex border-t lg:border-t-0 lg:border-b border-gray-200 dark:border-darkMode-500  lg:grid gap-10 lg:grid-cols-[1fr_minmax(400px,_1fr)_1fr]  xl:grid-cols-[290px_minmax(600px,_1fr)_290px] right-0 justify-between lg:py-5 px-2 lg:px-10 bg-white dark:bg-zinc-900  w-full ">
          <div className="hidden lg:flex fill-violet-600 dark:fill-white  w-[280px]">
            <Link href={"/app"}>
              <div className="h-[100%] w-[114px]">
                <Logo />
              </div>
            </Link>
          </div>

          {/* ---search ---- */}
          <div className="hidden lg:flex ">
            <Search />
          </div>
          {isCartOn && (
            <div className="w-[500px] absolute top-20 right-6 animate__animated animate__slideInRight animate__faster	">
              <Cart />
            </div>
          )}

          <div className="flex flex-row lg:gap-5 items-center justify-end  text-gray-500 ">
            <div className="hidden lg:flex gap-5">
              <div
                className="relative flex items-center w-[20px] h-[20px]"
                onClick={toggleCart}
              >
                {Object.keys(cart).length !== 0 && (
                  <span className="bg-red-700 cursor-pointer absolute z-[100] bottom-3 -right-3 text-white px-2 rounded text-xs font-medium">
                    {Object.keys(cart).length > 9
                      ? "9+"
                      : Object.keys(cart).length}
                  </span>
                )}
                <button>
                  <BsBagFill size={20} className="dark:text-white" />
                </button>
              </div>
              <Link href="app/notifications">
                <div className="relative flex items-center w-[20px] h-[20px]">
                  {notificationCount !== 0 && (
                    <span className="bg-red-700 cursor-pointer absolute z-[100] bottom-3 -right-3 text-white px-2 rounded text-xs font-medium">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </span>
                  )}
                  <button>
                    <BsBellFill size={20} className="dark:text-white" />
                  </button>
                </div>
              </Link>
              <BsGearFill />
            </div>
            {active.label === "post" ? (
              <div className="py-3 flex lg:hidden w-full">
                <div className="flex gap-4 items-center">
                  <div className="w-[40px]">
                    <UserProfileImage
                      imgSrc={getAuth()?.displayImageUrl as string}
                      name={getAuth()?.name as string}
                      type={"merchant"}
                      size="small"
                      isVerified={true}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      value={undefined}
                      placeholder={"Leave a comment"}
                      onChange={() => {}}
                      name={""}
                      isRequired={false}
                      isError={false}
                      icon={{
                        element: (
                          <IoSend className="text-violet-600 dark:text-gray-200" />
                        ),
                        position: "right",
                        onClick: () => {},
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex lg:hidden w-full items-between">
                {getAuth()?.accountType === "merchant" ? (
                  <RenderLinks List={Links} />
                ) : (
                  <RenderLinks List={LinksGeneral} />
                )}
              </div>
            )}

            {getAuth() ? (
              <div className="lg:flex hidden">
                <UserProfileImage
                  imgSrc={getAuth()?.displayImageUrl as string}
                  name={getAuth()?.name as string}
                  size="small"
                  type={"general"}
                  isVerified={false}
                />
              </div>
            ) : (
              <div className="lg:flex hidden">
                <Button
                  onClick={() => Router.push("/account/login")}
                  size={"default"}
                  variant={"primary"}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-[330px] hidden lg:flex"></div>

      {/* ------------------------children starts------------------------- */}
      <ErrorBoundary fallback={<div>Oops! Something went wrong</div>}>
        <div className=" py-[95px] w-full">{children}</div>
      </ErrorBoundary>
      {/* ------------------------children ends------------------------- */}

      <div className=" w-[330px] h-screen hidden xl:flex"></div>

      {/* fixed */}
      <div className="border-l bg-white dark:bg-transparent  p-5 pt-[110px] hidden xl:flex fixed right-0 border-gray-200 dark:border-darkMode-500 w-[330px] h-screen">
        <div className="flex flex-col gap-5 w-full">
          <h4 className="text-base font-semibold text-gray-700 dark:text-gray-100">
            People You May follow
          </h4>
          <div className="flex flex-col xl:justify-between gap-3 overflow-hidden">
            {peopleYouMayKnow.map((user, i) => {
              return (
                <FollowUserCard
                  onClick={() => {}}
                  key={i}
                  user={user}
                  display={"horizontal"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeNavBarChild() {
  const Router = useRouter();
  const [isDrawerOn, setIsDrawerOn] = useAtom(drawerAtom);
  const { setActive } = useNavigationBar();
  const { cart, isCartOn, toggleCart } = useCart();
  const { count: notificationCount } = useNotifications();
  return (
    <div className="relative flex items-center justify-between w-full">
      <div
        className="lg:hidden flex cursor-pointer"
        onClick={() => setIsDrawerOn(true)}
      >
        <IoMenuOutline size={25} className="text-gray-700 dark:text-gray-100" />
      </div>
      <Link href={"/app"}>
        <div className="fill-violet-600 dark:fill-white w-[90px] h-[35px]">
          <div className="h-[35px] w-[90px]">
            <Logo />
          </div>
        </div>
      </Link>
      {isLoggedIn() ? (
        <div className="flex gap-4 items-center ">
          <div
            onClick={() => {
              Router.push(`/app/search?q="null"`);
              setActive({ label: "search", data: "" });
            }}
            className="text-gray-700 dark:text-slate-300"
          >
            <BsSearch size={20} />
          </div>
          <div
            className="relative flex items-center w-[20px] h-[20px]"
            onClick={toggleCart}
          >
            {Object.keys(cart).length !== 0 && (
              <span className="bg-red-700 cursor-pointer absolute z-[100] bottom-3 -right-3 text-white px-2 rounded text-xs font-medium">
                {Object.keys(cart).length > 9 ? "9+" : Object.keys(cart).length}
              </span>
            )}
            <button>
              <BsBagFill size={20} className="dark:text-white" />
            </button>
          </div>
          {getAuth()?.accountType === "merchant" && (
            <Link href="app/notifications">
              <div className="relative flex items-center w-[20px] h-[20px]">
                {notificationCount !== 0 && (
                  <span className="bg-red-700 cursor-pointer absolute z-[100] bottom-3 -right-3 text-white px-1 rounded text-xs font-medium">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
                <button>
                  <BsBellFill size={20} className="dark:text-white" />
                </button>
              </div>
            </Link>
          )}
          {isCartOn && (
            <div className="absolute z-[1000] top-16 right-0 w-[90vw] animate__animated animate__slideInRight animate__faster	">
              <Cart />
            </div>
          )}
        </div>
      ) : (
        <Button
          onClick={() => {
            Router.push("/account/login");
            setIsDrawerOn(false);
          }}
          size={"extraSmall"}
          variant={"primary"}
          className="py-3 px-5 "
          borderRadius="rounded-full"
        >
          Login
        </Button>
      )}
    </div>
  );
}

export function Drawer() {
  const Router = useRouter();
  const [isDrawerOn, setIsDrawerOn] = useAtom(drawerAtom);
  const { peopleYouMayKnow, getPeopleYouMayKnow } = usePeopleYouMayKnow(5);
  return (
    <div
      // onClick={() => setIsDrawerOn(false)}
      className="flex flex-col gap-5 z-[190] animate__animated animate__slideInLeft lg:hidden fixed top-0 left-0 bg-gray-2000 dark:bg-darkMode-900 bg-white h-screen w-[90vw] p-3"
    >
      <div className="flex justify-end">
        <div
          onClick={() => setIsDrawerOn(false)}
          className="border border-gray-200 rounded-[14px] w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          <span className="text-slate-700 dark:text-slate-200">
            <BsXLg />
          </span>
        </div>
      </div>
      {getAuth() ? (
        <div className="flex flex-col gap-4">
          <div className=" flex flex-col gap-4 items-start min-w-[280px] px-10 py-4 border border-slate-200 dark:border-none  rounded-[15px]">
            <UserName
              name={getAuth()?.name as string}
              userName={getAuth()?.username}
              imgSrc={getAuth()?.displayImageUrl as string}
              type={
                getAuth()?.accountType as "merchant" | "assistant" | "general"
              }
              isVerified={true}
            />
            <Button
              onClick={() => {
                if (getAuth()?.accountType === "merchant") {
                  Router.push(`/app/merchant/profile/${getAuth()?.id}`);
                } else {
                  Router.push(`/app/profile/${getAuth()?.id}`);
                }
              }}
              className="w-full"
              size={"default"}
              variant={"primary"}
            >
              Edit Your Profile
            </Button>
          </div>
          <Button
            onClick={() => {
              logoOut();
              Router.push("/account/login");
              setIsDrawerOn(false);
            }}
            size={"default"}
            variant={"secondary"}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 border border-gray-200 dark:border-darkMode-300 p-3 rounded-md">
          <Button
            onClick={() => {
              Router.push("/account/register");
              setIsDrawerOn(false);
            }}
            size={"default"}
            variant={"primary"}
          >
            Create a free account
          </Button>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center text-gray-700 dark:text-gray-400 text-sm">
              <BsPencilSquare />
              <p>
                <span className="text-violet-400">Create, </span>{" "}
                <span>like and share posts </span>
              </p>
            </div>
            <div className="flex gap-3 items-center text-gray-700 dark:text-gray-400 text-sm">
              <BsBagFill />
              <p>
                <span className="text-violet-400">Buy</span>{" "}
                <span>your favourit products</span>
              </p>
            </div>
            <div className="flex gap-3 items-center text-gray-700 dark:text-gray-400 text-sm">
              <BsCalendar2CheckFill />
              <p>
                <span className="text-violet-400">Book</span>{" "}
                <span>for services</span>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="w-full">
        <div className="flex flex-col gap-5 w-full">
          <h4 className="text-base font-semibold text-gray-700 dark:text-gray-100">
            People You May follow
          </h4>
          <div className="flex flex-col xl:justify-between gap-3 overflow-y-auto">
            {peopleYouMayKnow.map((user, i) => {
              return (
                <FollowUserCard
                  onClick={() => {
                    getPeopleYouMayKnow();
                    // setTimeout(() => {
                    //   setIsDrawerOn(false);
                    // }, 2000);
                  }}
                  key={i}
                  user={user}
                  display={"horizontal"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
