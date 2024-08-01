"use Client";

import useUserDetails from "@/app/features/accounts/hooks/useUserDetails";
import { followCountAtom } from "@/app/features/accounts/view/FollowButton";
import PublicUserProfile from "@/app/features/accounts/view/profile/PublicUserProfile";
import ProductPost from "@/app/features/content/view/ProductPost";
import useNavigationBar from "@/app/features/layout/hooks/useNavigationBar";
import UserProducts from "@/app/features/product/views/UserProducts";
import { Iproduct } from "@/app/models/product";
import { iPost, IpublicUser } from "@/app/models/user";
import TabCard, { tab } from "@/components/common/Tabs";
import { Checkbox } from "@/components/molecules/Form";
import UserName from "@/components/molecules/UserName";
import { getAuth } from "@/scripts/utils";
import axios from "axios";
import { useAtom } from "jotai";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function User({
  user,
  userPosts,
}: {
  user: IpublicUser;
  userPosts: iPost[];
}) {
  const Router = useRouter();

  const { activeTab, setActiveTab, Tabs, postCount } = useUserDetails(
    user.id,
    user
  );

  const { setActive } = useNavigationBar();
  useEffect(() => {
    setActive({ label: "profile", data: user.name });
  }, []);

  console.log("From user public user: ", user)

  return (
    <div className="flex w-full flex-col gap-5 max-w-[700px] mx-auto">
      <div className="mx-auto w-full">
        <PublicUserProfile
          user={
            {
              id: user.id,
              username: user.username,
              name: user.name,
              email: "",
              accountType: user.accountType,
              description: user.description,
              displayImageUrl: user.displayImageUrl,
              followId: user.followId,
            } as IpublicUser
          }
          type={user.id === getAuth()?.id ? "private" : "public"}
          followers={user.followerCount as number}
          following={user.followingCount as number}
          postCount={postCount}
        />
      </div>
      <div className="box-small gap-0">
        {/* ---tabs--- */}
        <TabCard
          tabsList={Tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        <div className="">
          <RenderActiveData
            active={activeTab.label}
            user={user}
            userPosts={userPosts}
          />
        </div>
      </div>
    </div>
  );
}

function RenderActiveData({
  active,
  userPosts,
  user,
}: {
  active: string;
  user: IpublicUser;
  userPosts: iPost[];
}) {
  const { assistants } = useUserDetails(user.id);

  switch (active) {
    case "Images":
      return <div className="">images</div>;
    case "Assistants":
      return (
        <div className="p-5">
          <div className="flex flex-col gap-5">
            {assistants.map((user, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-between items-center hover:bg-gray-900 cursor-pointer p-2 rounded-md"
                >
                  <UserName
                    name={user.name}
                    userName={user.username}
                    imgSrc={user.displayImageUrl}
                    type={user.accountType}
                    isVerified={true}
                  />
                  <Checkbox onChange={() => {}} checked={false} />
                </div>
              );
            })}
          </div>
        </div>
      );
    case "Products":
      return (
        <div className="lg:p-5 py-4">
          <UserProducts id={user.id} />
        </div>
      );
    default:
      return (
        <div className="">
          {userPosts.length !== 0 ? (
            userPosts?.map((userPost: iPost, i) => {
              return (
                <div
                  key={userPost.id}
                  className="border-b border-gray-200 dark:border-gray-600 px-auto w-full"
                >
                  <ProductPost
                    wrapperClass={"shadow-none mx-auto border-none"}
                    key={i}
                    id={userPost?.id}
                    post={userPost}
                    media={userPost?.media}
                    user={userPost?.user}
                    date={new Date(userPost?.createdAt * 1000)}
                    product={userPost?.postProduct?.product as Iproduct}
                    content={{
                      message: userPost.message,
                      price: userPost?.postProduct?.product.price as number,
                      name: userPost?.postProduct?.product.name as string,
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div className="flex flex-col">
              <div className="">
                <div className="flex flex-col gap-4 mx-auts w-full items-center">
                  <div
                    style={{
                      backgroundSize: "100%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="bg-[url('/emptyFeeds.svg')] dark:bg-[url('/emptyFeeds_black.svg')] w-[300px] h-[300px]"
                  ></div>
                  <h4 className="text-gray-700 text-base dark:text-gray-100 font-semibold">
                    No posts found!
                  </h4>
                  <p className="text-gray-700 text-xs dark:text-gray-100 font-semibold">
                    {" "}
                    {user.name} haven&apos;t posted anything yet.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
  }
}

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
// const server_url = "https://indux.serveo.net/api/v1/";

export const getServerSideProps:
  | GetServerSideProps<{ user: IpublicUser }>
  | string = async (context) => {
  let boilerPlate: IpublicUser = {
    id: "",
    name: "",
    username: "",
    accountType: "general",
    displayImageUrl: "",
    description: "",
  };
  let posts: iPost[] = [];

  try {
    const { data, status, headers } = await axios.get(
      `https://3f5d-41-169-13-10.ngrok-free.app/api/v1/user/username/${context?.params?.username}/`,
      {
        headers: {
          "Cache-Control": "no-store", // Disable caching
        },
      }
    );
    console.log(headers);
    if (status === 200 || status === 201) {
      const { data: PostsData } = await axios.get(
        `${server_url}post/?userId=${
          data.data.id
        }&limit=20&offset=${new Date().getTime()}`,
        {
          headers: {
            "Cache-Control": "no-store", // Disable caching
          },
        }
      );
      posts = [...PostsData.data];
    }
    boilerPlate = { ...data.data };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      user: { ...boilerPlate },
      userPosts: posts,
    },
  };
};
